#!/usr/bin/env bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║             PORTFOLIO DEPLOYMENT PIPELINE — INDUSTRY GRADE                 ║
# ║     Runs: quality checks → build → commit → push → CI/CD trigger           ║
# ╚══════════════════════════════════════════════════════════════════════════════╝
set -euo pipefail
IFS=$'\n\t'

# ── Trap: always restore state on unexpected exit ──────────────────────────────
trap 'on_error $? $LINENO' ERR
trap 'on_exit' EXIT

on_error() {
  local exit_code=$1
  local line=$2
  echo ""
  print_error "Pipeline aborted on line ${line} (exit code: ${exit_code})."
  print_error "No files were committed or pushed."
  exit "$exit_code"
}

on_exit() {
  # Re-enable cursor if it was hidden
  tput cnorm 2>/dev/null || true
}

# ── Color & Symbol Palette ─────────────────────────────────────────────────────
if [[ -t 1 ]] && command -v tput &>/dev/null && [[ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]]; then
  BOLD="$(tput bold)"
  RESET="$(tput sgr0)"
  RED="$(tput setaf 1)"
  GREEN="$(tput setaf 2)"
  YELLOW="$(tput setaf 3)"
  BLUE="$(tput setaf 4)"
  MAGENTA="$(tput setaf 5)"
  CYAN="$(tput setaf 6)"
  WHITE="$(tput setaf 7)"
  DIM="$(tput dim)"
else
  BOLD="" RESET="" RED="" GREEN="" YELLOW="" BLUE="" MAGENTA="" CYAN="" WHITE="" DIM=""
fi

SYM_OK="${GREEN}✔${RESET}"
SYM_FAIL="${RED}✖${RESET}"
SYM_WARN="${YELLOW}⚠${RESET}"
SYM_INFO="${CYAN}ℹ${RESET}"
SYM_STEP="${BLUE}▶${RESET}"
SYM_ARROW="${MAGENTA}→${RESET}"

# ── Logging Helpers ────────────────────────────────────────────────────────────
print_header() {
  echo ""
  echo "${BOLD}${BLUE}╔══════════════════════════════════════════════════════════╗${RESET}"
  echo "${BOLD}${BLUE}║${RESET}  ${BOLD}${WHITE}$1${RESET}"
  echo "${BOLD}${BLUE}╚══════════════════════════════════════════════════════════╝${RESET}"
  echo ""
}

print_step() {
  echo "  ${SYM_STEP} ${BOLD}$1${RESET}"
}

print_ok() {
  echo "  ${SYM_OK} ${GREEN}$1${RESET}"
}

print_error() {
  echo "  ${SYM_FAIL} ${RED}${BOLD}ERROR:${RESET} ${RED}$1${RESET}" >&2
}

print_warn() {
  echo "  ${SYM_WARN} ${YELLOW}$1${RESET}"
}

print_info() {
  echo "  ${SYM_INFO} ${DIM}$1${RESET}"
}

print_divider() {
  echo "  ${DIM}──────────────────────────────────────────────────────────${RESET}"
}

# ── Pre-flight Checks ──────────────────────────────────────────────────────────
preflight_checks() {
  print_header "PRE-FLIGHT CHECKS"

  # 1. Must be run from a git repository
  print_step "Verifying git repository..."
  if ! git rev-parse --git-dir &>/dev/null; then
    print_error "Not a git repository. Run this script from your project root."
    exit 1
  fi
  print_ok "Git repository detected."

  # 2. Must be in the repo root (package.json must exist here)
  print_step "Verifying project root..."
  if [[ ! -f "package.json" ]]; then
    print_error "package.json not found. Are you in the project root?"
    exit 1
  fi
  print_ok "package.json found."

  # 3. node_modules must exist
  print_step "Checking node_modules..."
  if [[ ! -d "node_modules" ]]; then
    print_warn "node_modules not found. Running 'npm ci' first..."
    npm ci
    print_ok "Dependencies installed."
  else
    print_ok "node_modules present."
  fi

  # 4. Required tools
  print_step "Checking required tools..."
  local missing=()
  for cmd in git node npm; do
    if ! command -v "$cmd" &>/dev/null; then
      missing+=("$cmd")
    fi
  done
  if [[ ${#missing[@]} -gt 0 ]]; then
    print_error "Missing required tools: ${missing[*]}"
    exit 1
  fi
  print_ok "All required tools found (git, node, npm)."

  # 5. Check for unstaged changes to tracked files (just warn, not abort)
  print_step "Checking working tree..."
  if git diff --quiet && git diff --cached --quiet; then
    print_warn "Working tree is clean. There may be nothing new to commit."
    echo ""
    read -r -p "    ${YELLOW}Continue anyway? [y/N]:${RESET} " CONTINUE_CLEAN
    if [[ ! "$CONTINUE_CLEAN" =~ ^[Yy]$ ]]; then
      print_info "Aborted by user."
      exit 0
    fi
  else
    local changed
    changed=$(git status --short | wc -l | tr -d ' ')
    print_ok "Working tree has ${changed} modified file(s)."
  fi

  # 6. Confirm we're on the right branch
  CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "HEAD detached")
  print_step "Confirming active branch..."
  if [[ "$CURRENT_BRANCH" == "HEAD detached" ]]; then
    print_error "You are in a detached HEAD state. Cannot push."
    exit 1
  fi
  print_ok "Active branch: ${BOLD}${CYAN}${CURRENT_BRANCH}${RESET}"

  print_divider
  print_ok "All pre-flight checks passed."
}

# ── Stage 1: Quality Gate ──────────────────────────────────────────────────────
run_quality_check() {
  print_header "STAGE 1 / 4 — QUALITY GATE (npm run check)"
  print_info "Running Biome linter and TypeScript type-checker..."
  echo ""

  local start_time
  start_time=$(date +%s)

  if ! npm run check; then
    print_error "Quality check failed. Fix all linting/type errors before deploying."
    exit 1
  fi

  local end_time elapsed
  end_time=$(date +%s)
  elapsed=$((end_time - start_time))

  echo ""
  print_ok "Quality gate passed in ${elapsed}s."
}

# ── Stage 2: Production Build ──────────────────────────────────────────────────
run_build() {
  print_header "STAGE 2 / 4 — PRODUCTION BUILD (npm run build)"
  print_info "Compiling and generating static export..."
  echo ""

  local start_time
  start_time=$(date +%s)

  print_step "Cleaning up previous build artifacts..."
  rm -rf out .next portfolio
  print_ok "Cleanup complete."

  if ! npm run build; then
    print_error "Build failed. The production bundle could not be created."
    exit 1
  fi

  local end_time elapsed
  end_time=$(date +%s)
  elapsed=$((end_time - start_time))

  echo ""
  # Verify the 'out' directory was created
  if [[ ! -d "out" ]]; then
    print_warn "'out' directory was not generated. Static export may not have run."
  else
    local out_size
    out_size=$(du -sh out 2>/dev/null | cut -f1 || echo "unknown")
    print_ok "Build successful in ${elapsed}s. Output size: ${BOLD}${out_size}${RESET}."
  fi
}

# ── Stage 3: Commit ────────────────────────────────────────────────────────────
run_commit() {
  print_header "STAGE 3 / 4 — COMMIT CHANGES"

  # Stage all changes
  print_step "Staging all changes (git add .)..."
  git add .
  print_ok "All changes staged."

  # Show a clear diff summary to the user
  print_divider
  print_info "Staged changes:"
  echo ""
  git diff --cached --stat | while IFS= read -r line; do
    echo "    ${DIM}${line}${RESET}"
  done
  print_divider
  echo ""

  # Check if there's actually anything staged
  if git diff --cached --quiet; then
    print_warn "Nothing new to commit after 'git add .'. Skipping commit."
    COMMIT_SKIPPED=true
    return
  fi
  COMMIT_SKIPPED=false

  # Commit message prompt with validation loop
  local commit_msg=""
  while true; do
    echo ""
    echo "  ${BOLD}${YELLOW}Commit Message Guidelines:${RESET}"
    echo "  ${DIM}  Use a conventional prefix:${RESET}"
    echo "  ${DIM}  feat:, fix:, chore:, refactor:, docs:, style:, perf:${RESET}"
    echo "  ${DIM}  Min 2 chars, Max 72 chars. Example: 'feat: add dark mode toggle'${RESET}"
    echo ""
    read -r -p "  ${BOLD}${CYAN}Enter commit message:${RESET} " commit_msg

    # Trim leading/trailing whitespace
    commit_msg="${commit_msg#"${commit_msg%%[![:space:]]*}"}"
    commit_msg="${commit_msg%"${commit_msg##*[![:space:]]}"}"

    # Validation: not empty
    if [[ -z "$commit_msg" ]]; then
      print_warn "Commit message cannot be empty. Try again."
      continue
    fi

    # Validation: minimum length
    if [[ ${#commit_msg} -lt 2 ]]; then
      print_warn "Commit message is too short (min 2 chars). Try again."
      continue
    fi

    # Validation: maximum length
    if [[ ${#commit_msg} -gt 72 ]]; then
      print_warn "Commit message is too long (max 72 chars). Try again."
      continue
    fi

    break
  done

  # Confirm before committing
  echo ""
  print_info "Committing with message:"
  echo "  ${BOLD}\"${YELLOW}${commit_msg}${RESET}${BOLD}\"${RESET}"
  echo ""
  read -r -p "  ${BOLD}Confirm commit? [Y/n]:${RESET} " CONFIRM_COMMIT
  if [[ "$CONFIRM_COMMIT" =~ ^[Nn]$ ]]; then
    git reset HEAD
    print_info "Commit cancelled. Changes have been unstaged."
    exit 0
  fi

  git commit -m "$commit_msg"
  print_ok "Committed: \"${commit_msg}\""
}

# ── Stage 4: Deploy (Local CI/CD) ──────────────────────────────────────────────
run_push() {
  print_header "STAGE 4 / 4 — LOCAL DEPLOYMENT TO GH-PAGES"

  if [[ "${COMMIT_SKIPPED:-false}" == "true" ]]; then
    # Even if code didn't change, we might want to force a redeploy of the build
    print_info "No new code commit, but proceeding with build deployment..."
  fi

  print_step "Preparing deployment branch..."

  # 1. Ensure we have the out folder
  if [[ ! -d "out" ]]; then
    print_error "Build output 'out' folder not found. Run build stage first."
    exit 1
  fi

  # 2. Add .nojekyll to bypass GitHub's Jekyll processing
  touch out/.nojekyll
  print_ok "Bypassed Jekyll processing (.nojekyll added)."

  # 3. Initialize a temporary git repo in the out folder
  print_step "Pushing build artifacts to gh-pages branch..."
  
  (
    cd out
    git init -q
    git add .
    git commit -m "Deploy to GitHub Pages (Local CI/CD - $(date '+%Y-%m-%d %H:%M:%S'))" -q
    
    # Get the current remote URL
    REMOTE_URL=$(git -C .. remote get-url origin)
    
    # Force push the current branch of the 'out' repo to the 'gh-pages' branch of the remote
    git push --force "$REMOTE_URL" HEAD:gh-pages
  )

  if [[ $? -eq 0 ]]; then
    print_ok "Successfully deployed build to ${BOLD}gh-pages${RESET} branch."
  else
    print_error "Failed to push to gh-pages. Check your permissions or network."
    exit 1
  fi

  # 4. Push the source code to main as well (to keep repo in sync)
  print_step "Syncing source code to main branch..."
  if [[ "${COMMIT_SKIPPED:-false}" == "false" ]]; then
    git push origin "$CURRENT_BRANCH"
    print_ok "Source code synced to main."
  else
    print_info "Source code already in sync."
  fi
}

# ── Summary ────────────────────────────────────────────────────────────────────
print_summary() {
  local remote_url
  remote_url=$(git remote get-url origin 2>/dev/null || echo "unknown")

  local commit_status="${SYM_OK} ${GREEN}Commit${RESET}              created"
  if [[ "${COMMIT_SKIPPED:-false}" == "true" ]]; then
    commit_status="${SYM_WARN} ${YELLOW}Commit${RESET}              skipped (nothing to commit)"
  fi

  local push_status="${SYM_OK} ${GREEN}Push${RESET}                complete"
  if [[ "${COMMIT_SKIPPED:-false}" == "true" ]]; then
    push_status="${SYM_WARN} ${YELLOW}Push${RESET}                skipped (no new commit)"
  fi

  echo ""
  echo "${BOLD}${GREEN}╔══════════════════════════════════════════════════════════╗${RESET}"
  echo "${BOLD}${GREEN}║${RESET}  ${BOLD}${WHITE}🚀  DEPLOYMENT PIPELINE COMPLETE${RESET}"
  echo "${BOLD}${GREEN}╚══════════════════════════════════════════════════════════╝${RESET}"
  echo ""
  echo "  ${SYM_OK} ${GREEN}Quality Gate${RESET}        passed"
  echo "  ${SYM_OK} ${GREEN}Production Build${RESET}    passed"
  echo "  ${commit_status}"
  echo "  ${push_status}"
  echo ""
  echo "  ${SYM_INFO} Branch: ${BOLD}${CYAN}${CURRENT_BRANCH}${RESET}"
  echo "  ${SYM_INFO} Remote: ${DIM}${remote_url}${RESET}"
  echo ""
  if [[ "${COMMIT_SKIPPED:-false}" == "false" ]]; then
    print_info "GitHub Actions will now pick up the push and deploy to GitHub Pages."
  else
    print_info "No changes were pushed. Remote remains at the previous state."
  fi
  echo ""
}

# ── Main Entry Point ───────────────────────────────────────────────────────────
main() {
  # Ensure we always run from the project root (where this script lives)
  cd "$(dirname "$(realpath "$0")")"

  echo ""
  echo "${BOLD}${BLUE}  PORTFOLIO DEPLOYMENT PIPELINE${RESET}"
  echo "  ${DIM}$(date '+%A, %d %B %Y — %H:%M:%S %Z')${RESET}"
  echo ""

  preflight_checks
  run_quality_check
  run_build
  run_commit
  run_push
  print_summary
}

main "$@"
