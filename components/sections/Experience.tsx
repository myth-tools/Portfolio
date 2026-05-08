"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, Sparkles } from "lucide-react";
import { useRef } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData } from "@/lib/data";

const typeColors: Record<string, { accent: string; bg: string; border: string }> = {
	"Full-time": {
		accent: "#10b981",
		bg: "bg-emerald-50/50",
		border: "border-emerald-100",
	},
	"Part-time": {
		accent: "#3b82f6",
		bg: "bg-blue-50/50",
		border: "border-blue-100",
	},
	Freelance: {
		accent: "#f59e0b",
		bg: "bg-amber-50/50",
		border: "border-amber-100",
	},
};

export default function Experience({ experiences }: { experiences: PortfolioData["experiences"] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<section
			id="experience"
			ref={containerRef}
			className="section-padding relative overflow-hidden bg-[#fafafa]/30 contain-paint will-change-opacity will-change-transform"
			style={{ position: "relative" }}
		>
			{/* Ambient Light */}
			<div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-amber-50/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 transform-gpu" />

			<SectionReveal direction="up">
				<div className="container-custom relative z-10">
					{/* Header */}
					<div className="max-w-3xl mb-24">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="section-badge mb-4"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
							Career Path
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6"
						>
							Professional{" "}
							<span className="font-serif italic font-normal text-gray-400">Journey</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-gray-500 text-xl leading-relaxed font-light"
						>
							A chronological narrative of architectural challenges, technical leadership, and
							production-scale impacts.
						</motion.p>
					</div>

					{/* Timeline Container */}
					<div className="relative">
						{/* Liquid Connector Line */}
						<div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-100">
							<motion.div
								style={{ scaleY, originY: 0 }}
								className="absolute inset-0 bg-gradient-to-b from-amber-400 via-amber-500 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)] transform-gpu"
							/>
						</div>

						{/* Experience Items */}
						<div className="flex flex-col gap-12">
							{experiences.map((exp, index) => (
								<ExperienceItem key={exp.id} exp={exp} isLeft={index % 2 === 0} />
							))}
						</div>
					</div>
				</div>
			</SectionReveal>
		</section>
	);
}

function ExperienceItem({
	exp,
	isLeft,
}: {
	exp: PortfolioData["experiences"][0];
	isLeft: boolean;
}) {
	const typeStyle = typeColors[exp.type] || typeColors["Full-time"];

	return (
		<div
			className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
		>
			{/* Timeline Node */}
			<div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-8 w-10 h-10 z-20 flex items-center justify-center">
				<div className="w-4 h-4 rounded-full bg-white border-4 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" />
			</div>

			{/* Content Card */}
			<motion.div
				initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
				className={`w-full md:w-[45%] group`}
			>
				<div className="glass-card p-8 hover:shadow-2xl transition-all duration-500 border-black/[0.04] relative overflow-hidden group-hover:-translate-y-2 transform-gpu will-change-transform">
					{/* Corner Accent */}
					<div
						className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-black/[0.02] -rotate-45 translate-x-16 -translate-y-16"
						style={{ backgroundColor: `${typeStyle.accent}05` }}
					/>

					{/* Header */}
					<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-2xl bg-gray-50 border border-black/[0.05] flex items-center justify-center shadow-sm">
								<Briefcase
									size={20}
									className="text-gray-400 group-hover:text-amber-500 transition-colors"
								/>
							</div>
							<div>
								<h3 className="font-display font-bold text-xl text-gray-900 tracking-tight">
									{exp.role}
								</h3>
								<div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
									{exp.company}
									<span className="w-1 h-1 rounded-full bg-gray-300" />
									<span className="text-gray-400 font-normal">{exp.location}</span>
								</div>
							</div>
						</div>

						<div
							className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${typeStyle.bg} ${typeStyle.border} ${typeStyle.accent === "#10b981" ? "text-emerald-700" : typeStyle.accent === "#3b82f6" ? "text-blue-700" : "text-amber-700"}`}
						>
							{exp.type}
						</div>
					</div>

					{/* Duration Badge */}
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/[0.03] text-[11px] font-mono text-gray-500 mb-6">
						<Calendar size={12} />
						{exp.duration}
					</div>

					{/* Description */}
					<ul className="space-y-3 mb-8">
						{exp.description.map((point) => (
							<li
								key={point}
								className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
							>
								<div className="w-1.5 h-1.5 rounded-full bg-amber-400/40 mt-1.5 flex-shrink-0" />
								{point}
							</li>
						))}
					</ul>

					{/* Tech Stack Chips */}
					<div className="flex flex-wrap gap-2 pt-6 border-t border-black/[0.05]">
						{exp.stack.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1.5 rounded-xl bg-white border border-black/[0.06] text-[10px] font-bold text-gray-500 hover:text-amber-600 hover:border-amber-200 transition-all cursor-default shadow-sm"
							>
								{tech}
							</span>
						))}
					</div>

					{/* Liquid Highlight */}
					<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
				</div>
			</motion.div>

			{/* Date/Marker for opposite side on Desktop */}
			<div className="hidden md:block w-[45%]">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					className={`flex items-center gap-4 ${isLeft ? "justify-start" : "justify-end"}`}
				>
					<div className="flex items-center gap-2 text-gray-300">
						<Sparkles size={16} />
						<span className="font-mono text-xs tracking-[0.3em] uppercase">
							{exp.duration.split(" - ")[0]}
						</span>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
