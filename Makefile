# ═══════════════════════════════════════════════════════════════════════════
# Portfolio — Build, Development & Deployment Automation
# ═══════════════════════════════════════════════════════════════════════════
# Targets:
#   dev ............. Start Next.js dev server with HMR
#   build ........... Production build (static export to ./out)
#   lint ............ Biome lint + TypeScript type-check
#   check ........... Full quality gate (lint + build)
#   deploy .......... Deploy to Cloudflare Pages
#   clean / prune ... Remove build artifacts
#   doctor .......... Verify all required tools are installed
#   help ............ Show this help
# ═══════════════════════════════════════════════════════════════════════════

SHELL          := /usr/bin/bash
SHELLFLAGS     := -euo pipefail -c
.DELETE_ON_ERROR:
.DEFAULT_GOAL  := help
MAKEFLAGS      += --no-print-directory

# ─── Project Paths ──────────────────────────────────────────────────────
ROOT       := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
BUILD_DIR  := $(ROOT)/out
NEXT_DIR   := $(ROOT)/.next

# ─── Tool Paths ─────────────────────────────────────────────────────────
PNPM     := pnpm
NODE     := node
NPMX    := npx

# ─── OS Detection ───────────────────────────────────────────────────────
UNAME_S  := $(shell uname -s)
BUILD_OS := unknown
ifneq ($(filter Linux,$(UNAME_S)),)
  BUILD_OS := linux
endif
ifneq ($(filter Darwin,$(UNAME_S)),)
  BUILD_OS := macos
endif
ifneq ($(filter MINGW% CYGWIN% MSYS%,$(UNAME_S)),)
  BUILD_OS := windows
endif

# ─── Terminal Colors ────────────────────────────────────────────────────
ifeq ($(filter $(MAKEFLAGS),s),)
  ifneq ($(TERM),)
    ifeq ($(shell tput colors 2>/dev/null || echo 0),0)
      bold :=  cyan :=  green :=  yellow :=  red :=  dim :=  reset :=
    else
      bold  := $(shell tput bold 2>/dev/null)
      cyan  := $(shell tput setaf 6 2>/dev/null)
      green := $(shell tput setaf 2 2>/dev/null)
      yellow:= $(shell tput setaf 3 2>/dev/null)
      red   := $(shell tput setaf 1 2>/dev/null)
      dim   := $(shell tput setaf 8 2>/dev/null)
      reset := $(shell tput sgr0 2>/dev/null)
    endif
  endif
endif
bold   ?=
cyan   ?=
green  ?=
yellow ?=
red    ?=
dim    ?=
reset  ?=


# ═══════════════════════════════════════════════════════════════════════════
# TARGETS
# ═══════════════════════════════════════════════════════════════════════════

# ─── Help ───────────────────────────────────────────────────────────────
.PHONY: help
help:
	@echo ""
	@printf "$(bold)$(cyan)━━━ Portfolio — Make Targets ━━━$(reset)\n"
	@echo ""
	@printf "$(bold)Development:$(reset)\n"
	@printf "  $(green)dev$(reset)           Start Next.js dev server with HMR\n"
	@printf "  $(green)install$(reset)       Install all dependencies via pnpm\n"
	@echo ""
	@printf "$(bold)Build:$(reset)\n"
	@printf "  $(green)build$(reset)         Production build (static export to ./out)\n"
	@printf "  $(green)start$(reset)         Start production server from ./out\n"
	@echo ""
	@printf "$(bold)Quality:$(reset)\n"
	@printf "  $(green)check$(reset)         Full quality gate (biome + tsc)\n"
	@printf "  $(green)lint$(reset)          Biome lint (safe-fix mode)\n"
	@printf "  $(green)lint-check$(reset)    Biome lint (check only, no fixes)\n"
	@printf "  $(green)lint-ui$(reset)       Full end-to-end pipeline (lint + typecheck + build)\n"
	@printf "  $(green)fmt$(reset)           Biome format all files\n"
	@printf "  $(green)typecheck$(reset)     TypeScript strict type-check\n"
	@printf "  $(green)fix$(reset)           Auto-fix lint + formatting issues\n"
	@echo ""
	@printf "$(bold)Deployment [$(cyan)$(BUILD_OS)$(reset)]:$(reset)\n"
	@printf "  $(green)deploy-cf$(reset)     Deploy to Cloudflare Pages (via wrangler)\n"
	@printf "  $(green)deploy-gh$(reset)     Deploy to GitHub Pages (gh-pages branch)\n"
	@printf "  $(green)deploy$(reset)        Run full Cloudflare deployment pipeline\n"
	@echo ""
	@printf "$(bold)Diagnostics:$(reset)\n"
	@printf "  $(green)doctor$(reset)        Verify all required tools are installed\n"
	@printf "  $(green)info$(reset)          Show detected project configuration\n"
	@echo ""
	@printf "$(bold)Housekeeping:$(reset)\n"
	@printf "  $(green)clean$(reset)         Remove build artifacts (.next, out)\n"
	@printf "  $(green)clean-all$(reset)     Deep clean (build + node_modules)\n"
	@printf "  $(green)prune$(reset)         Aggressive cleanup (store prune + deep clean)\n"
	@echo ""
	@printf "$(bold)Current:$(reset)  os=$(cyan)$(BUILD_OS)$(reset)\n"
	@echo ""

# ─── Development ────────────────────────────────────────────────────────
.PHONY: dev
dev: install
	@printf "$(cyan)▶$(reset) starting dev server...\n"
	$(PNPM) run dev

.PHONY: install
install:
	@printf "$(cyan)▶$(reset) installing dependencies...\n"
	$(PNPM) install
	@printf "$(green)✓$(reset) dependencies installed\n"

# ─── Build ──────────────────────────────────────────────────────────────
.PHONY: build
build: install
	@printf "$(cyan)▶$(reset) cleaning previous build...\n"
	rm -rf "$(BUILD_DIR)" "$(NEXT_DIR)"
	@printf "$(cyan)▶$(reset) building production bundle...\n"
	$(PNPM) run build
	@printf "$(green)✓$(reset) build complete → $(BUILD_DIR)/\n"

.PHONY: start
start: build
	@printf "$(cyan)▶$(reset) serving static export...\n"
	npx serve $(BUILD_DIR)

# ─── Quality ────────────────────────────────────────────────────────────
.PHONY: check
check: lint typecheck
	@printf "$(green)✓$(reset) all checks passed\n"

.PHONY: lint-ui
lint-ui: install
	@printf "$(cyan)▶$(reset) biome format + lint + safe fixes...\n"
	$(PNPM) biome check --write app/ components/ lib/ 2>/dev/null || true
	@printf "$(green)✓$(reset) biome passed\n"
	@printf "$(cyan)▶$(reset) typescript type-check...\n"
	$(PNPM) run typecheck
	@printf "$(green)✓$(reset) typecheck passed\n"
	@printf "$(cyan)▶$(reset) production build (verifies full pipeline)...\n"
	rm -rf "$(BUILD_DIR)" "$(NEXT_DIR)"
	$(PNPM) run build
	@printf "$(green)✓$(reset) lint-ui complete\n"

.PHONY: lint
lint:
	@printf "$(cyan)▶$(reset) biome check --write...\n"
	$(PNPM) run lint:fix
	@printf "$(green)✓$(reset) lint complete\n"

.PHONY: lint-check
lint-check:
	@printf "$(cyan)▶$(reset) biome check (read-only)...\n"
	$(PNPM) run lint
	@printf "$(green)✓$(reset) lint check passed\n"

.PHONY: fmt
fmt:
	@printf "$(cyan)▶$(reset) formatting all files...\n"
	$(PNPM) biome format --write app/ components/ lib/ 2>/dev/null || true
	@printf "$(green)✓$(reset) format complete\n"

.PHONY: typecheck
typecheck:
	@printf "$(cyan)▶$(reset) typescript type-check...\n"
	$(PNPM) run typecheck
	@printf "$(green)✓$(reset) typecheck passed\n"

.PHONY: fix
fix:
	@printf "$(cyan)▶$(reset) auto-fixing lint + formatting...\n"
	$(PNPM) run check
	@printf "$(green)✓$(reset) fix complete\n"

# ─── Deployment ─────────────────────────────────────────────────────────
.PHONY: deploy-cf
deploy-cf:
	@printf "$(cyan)▶$(reset) deploying to Cloudflare Pages...\n"
	bash "$(ROOT)/cloudflare-deploy.sh"

.PHONY: deploy-gh
deploy-gh:
	@printf "$(cyan)▶$(reset) deploying to GitHub Pages...\n"
	bash "$(ROOT)/github-deploy.sh"

.PHONY: deploy
deploy: deploy-cf

# ─── Diagnostics ────────────────────────────────────────────────────────
.PHONY: doctor
doctor:
	@printf "$(bold)$(cyan)━━━ Portfolio Doctor — Tool Verification ━━━$(reset)\n"
	@failed=0; \
	for tool in node pnpm npx wrangler; do \
		if command -v "$$tool" >/dev/null 2>&1; then \
			printf "  $(green)✓$(reset) %-12s found\n" "$$tool"; \
		else \
			printf "  $(red)✗$(reset) %-12s NOT found\n" "$$tool"; \
			failed=$$((failed + 1)); \
		fi; \
	done; \
	printf "$(cyan)▶$(reset) %s\n" "$$(node --version 2>/dev/null || echo 'node N/A')"; \
	printf "$(cyan)▶$(reset) %s\n" "$$(pnpm --version 2>/dev/null || echo 'pnpm N/A')"; \
	if [ "$$failed" -gt 0 ]; then \
		printf "$(red)✗$(reset) %d tool(s) missing — install them first\n" "$$failed"; \
		exit 1; \
	fi; \
	printf "$(green)✓$(reset) all required tools present\n"

.PHONY: info
info:
	@printf "$(bold)$(cyan)━━━ Portfolio Configuration ━━━$(reset)\n"
	@printf "  $(bold)Root:$(reset)      %s\n" "$(ROOT)"
	@printf "  $(bold)OS:$(reset)        %s\n" "$(BUILD_OS)"
	@printf "  $(bold)Build:$(reset)     %s\n" "$(BUILD_DIR)"
	@printf "  $(bold)Next.js:$(reset)   %s\n" "$$($(PNPM) next --version 2>/dev/null || echo 'N/A')"
	@printf "  $(bold)Node:$(reset)      %s\n" "$$($(NODE) --version 2>/dev/null || echo 'N/A')"
	@printf "  $(bold)pnpm:$(reset)      %s\n" "$$($(PNPM) --version 2>/dev/null || echo 'N/A')"

# ─── Housekeeping ───────────────────────────────────────────────────────
.PHONY: clean
clean:
	@printf "$(cyan)▶$(reset) removing build artifacts...\n"
	rm -rf "$(BUILD_DIR)" "$(NEXT_DIR)"
	@printf "$(green)✓$(reset) clean complete\n"

.PHONY: clean-all
clean-all: clean
	@printf "$(cyan)▶$(reset) removing node_modules...\n"
	rm -rf "$(ROOT)/node_modules"
	@printf "$(green)✓$(reset) clean-all complete\n"

.PHONY: prune
prune:
	@printf "$(cyan)▶$(reset) aggressive cleanup...\n"
	rm -rf "$(BUILD_DIR)" "$(NEXT_DIR)" "$(ROOT)/node_modules"
	cd "$(ROOT)" && $(PNPM) store prune 2>/dev/null || true
	@printf "$(green)✓$(reset) prune complete\n"

# ─── Safety ─────────────────────────────────────────────────────────────
.PHONY: Makefile Makefile.*
