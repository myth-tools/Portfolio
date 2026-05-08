"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Logo } from "@/components/ui/Logo";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData } from "@/lib/data";

export default function Footer({
	personalInfo,
	navigation,
}: {
	personalInfo: PortfolioData["personalInfo"];
	navigation: PortfolioData["navigation"];
}) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 500);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const getHandle = (url: string, label: string) => {
		if (label === "Email") {
			return url.replace("mailto:", "");
		}
		try {
			const parts = url.replace(/\/$/, "").split("/");
			return `@${parts[parts.length - 1]}`;
		} catch {
			return label;
		}
	};

	const socialLinks = [
		{ icon: FaGithub, href: personalInfo.github, label: "GitHub", color: "#24292e" },
		{ icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn", color: "#0077b5" },
		{ icon: FaWhatsapp, href: personalInfo.whatsapp, label: "WhatsApp", color: "#25d366" },
		{ icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email", color: "#ea4335" },
	];

	return (
		<footer className="relative pt-12 pb-16 overflow-hidden bg-[#fafafa]/80 backdrop-blur-3xl border-t border-black/[0.05]">
			{/* Luxury Noise Overlay */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-soft-light"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* Ambient Glowing Blobs */}
			<div className="absolute -top-48 -left-48 w-[60vw] h-[60vw] bg-amber-50/20 blur-[140px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-violet-50/10 blur-[120px] rounded-full pointer-events-none" />

			<SectionReveal direction="up">
				<div className="container-custom relative z-10">
					{/* Top Level: Brand Finale */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
						<div className="lg:col-span-5">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="mb-10"
							>
								<div className="flex items-center gap-5 mb-8 group">
									<div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shadow-xl group-hover:rotate-[5deg] transition-all duration-700">
										<Logo name={personalInfo.name} showText={false} variant="light" size={28} />
									</div>
									<div>
										<h2 className="font-display font-bold text-3xl text-gray-900 tracking-tighter leading-none mb-2">
											{personalInfo.name}
											<span className="text-amber-500">.</span>
										</h2>
										<div className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
											<p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
												System Online &bull; Active
											</p>
										</div>
									</div>
								</div>

								<p className="font-serif text-xl text-gray-800 leading-snug italic max-w-sm mb-10">
									&quot;{personalInfo.tagline}&quot;
								</p>

								<div className="flex gap-3">
									<a
										href={personalInfo.resumeUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-6 py-3 bg-gray-950 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all shadow-xl shadow-gray-950/10 group"
									>
										Download CV
										<ArrowUpRight
											size={14}
											className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
										/>
									</a>
									<div className="px-5 py-3 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-2.5">
										<MapPin size={14} className="text-amber-500" />
										<span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em]">
											{personalInfo.location}
										</span>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Navigation Columns */}
						<div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-12">
							<div>
								<h4 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10">
									Directory
								</h4>
								<ul className="space-y-5">
									{navigation.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												className="group flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-all text-sm font-bold"
											>
												<div className="w-0 h-[1.5px] bg-amber-400 group-hover:w-4 transition-all duration-500" />
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>

							<div className="col-span-2">
								<h4 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10">
									Social Engineering
								</h4>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{socialLinks.map((soc) => (
										<a
											key={soc.label}
											href={soc.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group relative p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm hover:shadow-xl transition-all duration-500 flex items-center gap-4"
										>
											<div
												className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity"
												style={{ backgroundColor: soc.color }}
											/>
											<div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-950 group-hover:bg-white transition-all border border-transparent group-hover:border-black/[0.05] shrink-0">
												<soc.icon size={20} />
											</div>
											<div className="relative z-10 min-w-0 flex-1">
												<p className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:text-amber-600 transition-colors">
													{soc.label}
												</p>
												<p className="text-[11px] sm:text-xs font-bold text-gray-900 break-all sm:break-words">
													{getHandle(soc.href, soc.label)}
												</p>
											</div>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Footer Bottom Bar */}
					<div className="pt-10 border-t border-black/[0.05] flex items-center justify-center">
						<div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
							<div className="flex items-center gap-2 bg-black/[0.03] px-3 py-1.5 rounded-full border border-black/[0.03]">
								<Sparkles size={12} className="text-amber-500" />
								<span>Optimized Build</span>
							</div>
							<a
								href={personalInfo.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 bg-black/[0.03] px-3 py-1.5 rounded-full border border-black/[0.03] hover:bg-black/[0.06] transition-colors"
							>
								<FaGithub size={12} className="text-gray-900" />
								<span>Source Code</span>
							</a>
							<div className="flex items-center gap-2">
								<span>Crafted by</span>
								<span className="text-gray-900">{personalInfo.name}</span>
							</div>
						</div>
					</div>
				</div>
			</SectionReveal>

			{/* Floating Back to Top Button: Luxury Edition */}
			<AnimatePresence>
				{scrolled && (
					<motion.button
						initial={{ opacity: 0, scale: 0.5, y: 30 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.5, y: 30 }}
						whileHover={{ y: -8, scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={scrollToTop}
						className="fixed bottom-10 right-10 z-[100] w-14 h-14 rounded-2xl bg-gray-950/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center text-white overflow-hidden group transition-all duration-500 hover:shadow-amber-500/20 hover:border-amber-500/30"
					>
						{/* Ambient Glow Internal */}
						<div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="relative flex flex-col items-center">
							<motion.div
								animate={{
									y: [0, -40],
									opacity: [1, 0],
								}}
								transition={{
									duration: 0.8,
									repeat: Infinity,
									ease: "easeInOut",
									repeatDelay: 0.2,
								}}
								className="absolute group-hover:flex hidden"
							>
								<ArrowUp size={20} className="text-amber-400" />
							</motion.div>

							<ArrowUp
								size={20}
								className="group-hover:translate-y-10 group-hover:opacity-0 transition-all duration-500"
							/>
						</div>

						{/* Decorative Corner */}
						<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500/40 rounded-tr-md group-hover:w-4 group-hover:h-4 transition-all duration-500" />
					</motion.button>
				)}
			</AnimatePresence>
		</footer>
	);
}
