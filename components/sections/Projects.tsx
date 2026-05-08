"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { usePremiumAlert } from "@/components/ui/PremiumAlert";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData, Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Full-Stack", "Frontend", "Backend"] as const;

export default function Projects({
	projects,
	personalInfo,
}: {
	projects: PortfolioData["projects"];
	personalInfo: PortfolioData["personalInfo"];
}) {
	const [activeFilter, setActiveFilter] = useState<string>("All");
	const { triggerAlert } = usePremiumAlert();

	const filtered =
		activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

	return (
		<section id="projects" className="section-padding relative overflow-hidden bg-white">
			{/* Ambient high-fidelity background glows — Performance Optimized */}
			<div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/30 to-transparent rounded-full pointer-events-none transform-gpu" />
			<div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50/30 to-transparent rounded-full pointer-events-none transform-gpu" />

			<SectionReveal direction="up">
				<div className="container-custom relative z-10">
					{/* Header — Senior Architect Aesthetic */}
					<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
						<div className="max-w-2xl">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="section-badge mb-4"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
								Selected Creations
							</motion.div>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[0.9]"
							>
								Digital{" "}
								<span className="font-serif italic font-normal text-gray-300">Showroom</span>
							</motion.h2>
						</div>

						{/* Luxury Filter HUD */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-gray-50/50 border border-black/[0.03] backdrop-blur-sm"
						>
							{categories.map((cat) => (
								<button
									type="button"
									key={cat}
									onClick={() => setActiveFilter(cat)}
									className={`relative px-8 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${
										activeFilter === cat ? "text-gray-950" : "text-gray-400 hover:text-gray-600"
									}`}
								>
									<span className="relative z-10">{cat}</span>
									{activeFilter === cat && (
										<motion.div
											layoutId="projectActiveTab"
											className="absolute inset-0 bg-white shadow-sm border border-black/[0.05] rounded-xl z-0"
											transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
										/>
									)}
								</button>
							))}
						</motion.div>
					</div>

					{/* The Showroom — Vertical Cinematic Scroll */}
					<div className="flex flex-col">
						<AnimatePresence mode="popLayout">
							{filtered.map((project, index) => (
								<ShowroomCard
									key={project.id}
									project={project}
									index={index}
									onAlert={triggerAlert}
									personalInfo={personalInfo}
								/>
							))}
						</AnimatePresence>
					</div>

					{/* High-Fidelity Liquid Morphism CTA with 3D Depth */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-40 text-center relative transform-gpu"
						style={{ perspective: "1200px" }}
					>
						{/* Optimized Liquid Background Globs */}
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none w-full h-full z-0 transform-gpu">
							<motion.div
								animate={{
									scale: [1, 1.05, 1],
									opacity: [0.1, 0.2, 0.1],
								}}
								transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
								className="absolute w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 to-transparent rounded-full transform-gpu"
							/>
							<motion.div
								animate={{
									scale: [1.05, 1, 1.05],
									opacity: [0.1, 0.2, 0.1],
								}}
								transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
								className="absolute w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/20 to-transparent translate-x-16 transform-gpu"
							/>
						</div>

						{/* 3D Liquid Glass Container — Optimized for Performance */}
						<div
							style={{ transformStyle: "preserve-3d" }}
							className="inline-flex flex-col items-center p-12 md:p-16 rounded-[4rem] bg-white border border-black/5 shadow-xl relative group z-10 hover:scale-[1.01] transition-all duration-700 transform-gpu"
						>
							{/* Cinematic 3D Lighting Overlay */}
							<div
								style={{ transform: "translateZ(1px)" }}
								className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/10 to-transparent pointer-events-none rounded-[4rem]"
							/>

							<h3
								style={{ transform: "translateZ(30px)" }}
								className="relative z-10 font-display font-bold text-3xl md:text-4xl text-gray-900 mb-6 tracking-tight transition-transform duration-700 group-hover:-translate-y-1"
							>
								Ready for more?
							</h3>

							<p
								style={{ transform: "translateZ(20px)" }}
								className="relative z-10 text-gray-600 mb-10 max-w-sm font-light text-lg transition-transform duration-700 group-hover:-translate-y-1"
							>
								Explore my full experimental lab and architectural contributions on GitHub.
							</p>

							<a
								href={personalInfo.github}
								target="_blank"
								rel="noopener noreferrer"
								style={{ transform: "translateZ(40px)" }}
								className="btn-primary shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 hover:scale-105 transition-all duration-500 relative z-20"
							>
								<FaGithub size={18} />
								GitHub Archive
								<ArrowUpRight size={16} />
							</a>
						</div>
					</motion.div>
				</div>
			</SectionReveal>
		</section>
	);
}

function ShowroomCard({
	project,
	index,
	onAlert,
	personalInfo,
}: {
	project: Project;
	index: number;
	onAlert: (type?: "github" | "live" | "confidential" | "maintenance") => void;
	personalInfo: PortfolioData["personalInfo"];
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const isEven = index % 2 === 0;
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
	const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

	return (
		<div ref={containerRef} className="relative py-16 md:py-32" style={{ position: "relative" }}>
			{/* Architectural Connective Tissue — Thin Vertical Spine */}
			<div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-30 hidden lg:block" />

			<div className="container-custom relative">
				{/* Massive Ghost Numbering — Exhibition Anchor */}
				<motion.div
					style={{ opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.04, 0.04, 0]) }}
					className={cn(
						"absolute top-0 font-serif italic text-[28vw] leading-none pointer-events-none select-none text-gray-900",
						isEven ? "-left-16" : "-right-16",
					)}
				>
					{String(index + 1).padStart(2, "0")}
				</motion.div>

				<div
					className={cn(
						"flex flex-col lg:flex-row items-center gap-16 lg:gap-32",
						isEven ? "lg:flex-row" : "lg:flex-row-reverse",
					)}
				>
					{/* Project Monolith — Floating Cinematic Visual */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, x: isEven ? -40 : 40 }}
						whileInView={{ opacity: 1, scale: 1, x: 0 }}
						viewport={{ once: true, margin: "-10%" }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
						className="relative w-full lg:w-1/2 aspect-[16/10] group"
					>
						{/* Soft Depth Shadow */}
						<div className="absolute inset-4 bg-gray-950 rounded-[3rem] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-1000" />

						<div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-gray-100 border border-black/[0.05] shadow-2xl transform-gpu ring-1 ring-black/[0.03]">
							<motion.div style={{ scale: imageScale }} className="absolute inset-0 transform-gpu">
								{project.image && project.showImage ? (
									<Image
										src={project.image}
										alt={`${project.title} - High-Performance Application developed by ${personalInfo.name}`}
										fill
										className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 brightness-95 group-hover:brightness-100"
										priority={index < 2}
									/>
								) : (
									<PremiumProjectFallback project={project} />
								)}
							</motion.div>

							{/* Technical Identity Tag */}
							<div className="absolute top-8 left-8 flex flex-col gap-3 z-20 pointer-events-none">
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white tracking-[0.25em] uppercase"
								>
									{project.category}
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Project Content — Narrative Engineering */}
					<motion.div
						style={{ y: contentY }}
						className={cn(
							"w-full lg:w-1/2 flex flex-col",
							isEven ? "items-start text-left" : "items-end text-right",
						)}
					>
						{/* Flagship Signal */}
						{project.featured && (
							<div className="flex items-center gap-3 text-amber-500 mb-8 font-black text-[11px] tracking-[0.4em] uppercase">
								<div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
								Flagship Development
							</div>
						)}

						<h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-10 leading-[0.95] drop-shadow-sm">
							{project.title}
						</h3>

						<p className="font-serif italic text-xl md:text-2xl text-gray-500 mb-14 leading-relaxed max-w-xl opacity-80">
							&quot;{project.description}&quot;
						</p>

						{/* Tech Stack — Refined HUD Pills */}
						<div
							className={cn(
								"flex flex-wrap gap-2.5 mb-14",
								isEven ? "justify-start" : "justify-end",
							)}
						>
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="px-5 py-2 rounded-xl bg-gray-50 border border-gray-200/60 text-[11px] font-bold text-gray-500 uppercase tracking-widest shadow-sm hover:border-gray-900/20 transition-colors"
								>
									{tag}
								</span>
							))}
						</div>

						{/* Action Orchestration — Premium Control Hub */}
						<div className="flex flex-wrap gap-5">
							<button
								type="button"
								onClick={() => {
									if (project.githubPrivate || !project.github || project.github === "#") {
										onAlert("github");
									} else {
										window.open(project.github, "_blank", "noopener,noreferrer");
									}
								}}
								className="group/btn relative px-10 py-5 rounded-2xl bg-gray-900 text-white font-bold text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-black hover:-translate-y-1.5 shadow-xl shadow-black/10 active:scale-95"
							>
								<div className="flex items-center gap-3 relative z-10">
									{project.githubPrivate ? <Lock size={14} /> : <FaGithub size={16} />}
									Source Core
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
							</button>

							<button
								type="button"
								onClick={() => {
									if (project.livePrivate || !project.live || project.live === "#") {
										onAlert("live");
									} else {
										window.open(project.live, "_blank", "noopener,noreferrer");
									}
								}}
								className="group/btn relative px-10 py-5 rounded-2xl bg-white border border-gray-200 text-gray-900 font-bold text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all hover:border-gray-900 hover:-translate-y-1.5 shadow-lg active:scale-95"
							>
								<div className="flex items-center gap-3 relative z-10">
									{project.livePrivate ? <Lock size={14} /> : <ExternalLink size={16} />}
									Live Lab
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

function PremiumProjectFallback({ project }: { project: Project }) {
	return (
		<div className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${project.gradient}`}>
			{/* Static Grid Noise Overlay — Performance Optimized */}
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h18v18H1V1zm1 1v16h16V2H2z' fill='%23FFF' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* Ghost Typography — Cinematic Background */}
			<div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
				<h4 className="font-display text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap animate-marquee">
					{project.category} • {project.category} • {project.category}
				</h4>
			</div>

			{/* The Abstract Monolith — Central 3D Visual */}
			<div className="absolute inset-0 flex items-center justify-center">
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					className="relative"
				>
					{/* Outer Glow */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent scale-150 pointer-events-none" />

					{/* Glassmorphic Shield — Reduced Blur for Performance */}
					<div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-1000 overflow-hidden transform-gpu">
						{/* Liquid reflection */}
						<div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50" />

						{/* Tech Icon — Luxury High-Impact */}
						<span className="text-8xl md:text-9xl drop-shadow-[0_10px_30px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-1000">
							{project.icon}
						</span>
					</div>

					{/* Orbiting particles — High-end detail */}
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						className="absolute inset-[-20%] border border-white/5 rounded-full pointer-events-none"
					/>
				</motion.div>
			</div>

			{/* Top light beam for depth */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-gradient-to-b from-white/10 to-transparent blur-3xl pointer-events-none" />
		</div>
	);
}
