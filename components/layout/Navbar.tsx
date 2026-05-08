"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import type { PortfolioData } from "@/lib/data";

export default function Navbar({
	personalInfo,
	navigation,
}: {
	personalInfo: PortfolioData["personalInfo"];
	navigation: PortfolioData["navigation"];
}) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);

			const sections = navigation.map((l) => l.href.slice(1));
			for (const id of sections.reverse()) {
				const el = document.getElementById(id);
				if (el && window.scrollY >= el.offsetTop - 120) {
					setActiveSection(id);
					break;
				}
			}
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setMobileOpen(false);
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [navigation]);

	const handleNavClick = (href: string) => {
		setMobileOpen(false);
		const el = document.querySelector(href);
		el?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<header
				id="navbar"
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform will-change-opacity ${
					scrolled
						? "py-3 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm shadow-black/[0.03]"
						: "py-5 bg-transparent border-b border-transparent"
				}`}
			>
				<div className="container-custom">
					<nav className="flex items-center justify-between">
						{/* Logo */}
						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							aria-label="Go to top"
						>
							<Logo name={personalInfo.name} />
						</button>

						{/* Desktop Links */}
						<div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-black/[0.03] border border-black/[0.05]">
							{navigation.map((link) => {
								const isActive = activeSection === link.href.slice(1);
								return (
									<button
										type="button"
										key={link.href}
										onClick={() => handleNavClick(link.href)}
										className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
											isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
										}`}
										aria-label={`Navigate to ${link.label}`}
									>
										<span className="relative z-10">{link.label}</span>

										{/* Liquid Pill Background */}
										{isActive && (
											<motion.div
												layoutId="liquidPill"
												className="absolute inset-0 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-xl z-0"
												transition={{
													type: "spring",
													bounce: 0.35,
													duration: 0.6,
												}}
											/>
										)}

										{/* Active Dot with Liquid Bounce */}
										{isActive && (
											<motion.div
												layoutId="activeNavDot"
												className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500 z-10"
												transition={{
													type: "spring",
													bounce: 0.6,
													duration: 0.8,
												}}
											/>
										)}
									</button>
								);
							})}
						</div>

						{/* CTA */}
						<div className="hidden md:flex items-center gap-3">
							<a
								href={personalInfo.resumeUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
								aria-label="Download Resume"
							>
								Resume
								<ArrowUpRight
									size={13}
									className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
								/>
							</a>
						</div>

						{/* Mobile Command Center Toggle — Unique Node Engine */}
						<button
							type="button"
							onClick={() => setMobileOpen(!mobileOpen)}
							className="md:hidden relative z-[110] w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-black/[0.08] shadow-lg active:scale-95 transition-transform"
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
						>
							<div className="relative w-6 h-6 flex flex-col items-center justify-center gap-1.5">
								<motion.span
									animate={{
										rotate: mobileOpen ? 45 : 0,
										y: mobileOpen ? 4.5 : 0,
										width: mobileOpen ? "100%" : "80%",
									}}
									className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
								/>
								<motion.span
									animate={{
										opacity: mobileOpen ? 0 : 1,
										x: mobileOpen ? 10 : 0,
									}}
									className="w-full h-0.5 bg-gray-900 rounded-full"
								/>
								<motion.span
									animate={{
										rotate: mobileOpen ? -45 : 0,
										y: mobileOpen ? -4.5 : 0,
										width: mobileOpen ? "100%" : "60%",
									}}
									className="w-full h-0.5 bg-gray-900 rounded-full origin-center self-start"
								/>
							</div>
						</button>
					</nav>
				</div>
			</header>

			{/* Mobile Command Center Drawer — Ultra-Luxury 'Void Exhibition' */}
			<AnimatePresence>
				{mobileOpen && (
					<>
						{/* Deep Atmospheric Overlay */}
						<motion.div
							initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
							animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
							exit={{
								opacity: 0,
								backdropFilter: "blur(0px)",
								transition: { duration: 0.3 },
							}}
							className="fixed inset-0 z-[100] bg-black/40 pointer-events-auto cursor-pointer transform-gpu"
							onClick={() => setMobileOpen(false)}
						/>

						<motion.div
							initial={{
								clipPath: "circle(0% at calc(100% - 40px) 40px)",
								opacity: 0,
								scale: 0.9,
								rotateY: 10,
							}}
							animate={{
								clipPath: "circle(150% at calc(100% - 40px) 40px)",
								opacity: 1,
								scale: 1,
								rotateY: 0,
							}}
							exit={{
								clipPath: "circle(0% at calc(100% - 40px) 40px)",
								opacity: 0,
								scale: 0.8,
								filter: "blur(20px)",
								transition: {
									duration: 0.4,
									ease: "backIn",
								},
							}}
							transition={{
								type: "spring",
								damping: 25,
								stiffness: 200,
							}}
							className="fixed inset-y-4 right-4 w-[calc(100%-2rem)] max-w-sm z-[105] bg-[#050505] rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/[0.08] flex flex-col overflow-hidden transform-gpu will-change-transform perspective-2000"
						>
							{/* Ambient Liquid Light Hub — Ultra-Subtle Background Energy */}
							<div className="absolute inset-0 overflow-hidden pointer-events-none">
								<motion.div
									animate={{
										scale: [1, 1.2, 1],
										rotate: [0, 90, 0],
										opacity: [0.1, 0.15, 0.1],
									}}
									transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
									className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-amber-500/10 blur-[120px] rounded-full"
								/>

								<div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
							</div>

							{/* Intellectual Narrative Spine — Vertical Line */}
							<div className="absolute left-10 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-white/[0.1] to-transparent" />

							<div className="relative z-10 flex-1 flex flex-col justify-center p-12 gap-8">
								{navigation.map((link, i) => (
									<motion.button
										initial={{ opacity: 0, x: 50, rotateX: 30, filter: "blur(8px)" }}
										animate={{ opacity: 1, x: 0, rotateX: 0, filter: "blur(0px)" }}
										exit={{
											opacity: 0,
											x: -30,
											scale: 0.9,
											filter: "blur(12px)",
											transition: { delay: i * 0.02, duration: 0.3 },
										}}
										transition={{
											delay: 0.15 + i * 0.06,
											type: "spring",
											stiffness: 150,
											damping: 18,
										}}
										type="button"
										key={link.href}
										onClick={() => handleNavClick(link.href)}
										className="group relative flex items-center gap-8 text-left perspective-1000"
									>
										{/* Active Indicator Node — Neural Strobe Source */}
										<div className="relative">
											<motion.div
												animate={{ opacity: [0.2, 1, 0.2] }}
												transition={{ duration: 2, repeat: Infinity }}
												className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-amber-500 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
											/>
											<span className="font-serif italic text-lg text-white/20 group-hover:text-amber-500/40 transition-colors duration-500 pl-6">
												0{i + 1}
											</span>
										</div>

										<div className="flex flex-col">
											<span className="text-[9px] font-black text-amber-500 tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700">
												View
											</span>
											<span className="font-display text-3xl font-bold text-white tracking-tight group-hover:translate-x-3 transition-transform duration-700 group-hover:text-shimmer">
												{link.label}
											</span>
											<div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 to-transparent transition-all duration-700" />
										</div>
									</motion.button>
								))}
							</div>

							{/* Drawer Control Footer */}
							<div className="relative z-10 p-10 mt-auto">
								<motion.a
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6, type: "spring" }}
									href={personalInfo.resumeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full flex items-center justify-center gap-4 py-6 bg-white text-black rounded-[2rem] font-bold text-xs tracking-[0.3em] uppercase shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all active:scale-95"
									onClick={() => setMobileOpen(false)}
								>
									View My Resume <ArrowUpRight size={14} />
								</motion.a>

								{/* Technical Rim Light */}
								<div className="mt-8 flex justify-center items-center gap-3 opacity-20">
									<div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
									<span className="text-[7px] font-black tracking-[0.5em] text-white uppercase">
										Navigation Center
									</span>
								</div>
							</div>

							{/* Rim Light / Surface Shine */}
							<div className="absolute inset-0 rounded-[3rem] border border-white/5 pointer-events-none" />
							<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
