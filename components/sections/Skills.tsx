"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
	SiAngular,
	SiDjango,
	SiDocker,
	SiExpress,
	SiFastapi,
	SiFigma,
	SiFirebase,
	SiGit,
	SiGithubactions,
	SiGraphql,
	SiHtml5,
	SiJavascript,
	SiJest,
	SiLaravel,
	SiLinux,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiNginx,
	SiNodedotjs,
	SiPhp,
	SiPostgresql,
	SiPostman,
	SiPrisma,
	SiPython,
	SiReact,
	SiRedis,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
	SiVite,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData } from "@/lib/data";

const iconMap: Record<string, IconType> = {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiAngular,
	SiHtml5,
	SiNodedotjs,
	SiExpress,
	SiDjango,
	SiFastapi,
	SiLaravel,
	SiGraphql,
	SiMongodb,
	SiPostgresql,
	SiMysql,
	SiRedis,
	SiFirebase,
	SiPrisma,
	SiDocker,
	SiAmazon: FaAws,
	SiVercel,
	SiGithubactions,
	SiNginx,
	SiLinux,
	SiJavascript,
	SiPython,
	SiPhp,
	SiGit,
	SiPostman,
	SiVisualstudiocode: VscCode,
	SiFigma,
	SiJest,
	SiVite,
};

export default function Skills({
	skillCategories,
	extraSkills,
}: {
	skillCategories: PortfolioData["skillCategories"];
	extraSkills: PortfolioData["extraSkills"];
}) {
	return (
		<section
			id="skills"
			className="section-padding relative overflow-hidden contain-paint will-change-opacity will-change-transform"
		>
			{/* Luxury Background Elements */}
			<div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-50/10 blur-[80px] rounded-full pointer-events-none transform-gpu" />
			<div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-violet-50/10 blur-[80px] rounded-full pointer-events-none transform-gpu" />

			<SectionReveal direction="up">
				<div className="container-custom relative z-10">
					{/* Header */}
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
						<div className="max-w-2xl">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="section-badge mb-4"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
								Proficiency
							</motion.div>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900"
							>
								Technical{" "}
								<span className="font-serif italic font-normal text-gray-400">Mastery</span>
							</motion.h2>
						</div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-gray-500 max-w-md text-lg leading-relaxed font-light"
						>
							A curated stack of production-grade technologies, frameworks, and architectural
							patterns I command.
						</motion.p>
					</div>

					{/* Bento Grid Layout */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{skillCategories.map((cat, index) => (
							<SkillCard
								key={cat.category}
								cat={cat}
								index={index}
								isLarge={index === 0 || index === 3}
							/>
						))}
					</div>

					{/* Supporting Arsenal (Extra Skills) */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-20 p-10 rounded-[2.5rem] bg-white border border-black/[0.05] shadow-2xl shadow-black/[0.02] relative overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-violet-50/20 pointer-events-none" />
						<div className="relative z-10 flex flex-col items-center">
							<h3 className="font-display font-bold text-gray-900 text-xl mb-10 tracking-tight">
								Supporting Arsenal
							</h3>
							<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 justify-center w-full">
								{extraSkills.map((skill, i) => (
									<motion.div
										key={skill}
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ delay: i * 0.03 }}
										whileHover={{ y: -5, scale: 1.05 }}
										className="px-4 py-2.5 rounded-xl bg-[#fafaf5] border border-black/[0.04] text-[10px] font-bold text-gray-600 shadow-sm hover:shadow-md hover:border-amber-200 hover:text-amber-700 transition-all cursor-default flex items-center gap-2 group/arsenal"
									>
										<div className="w-1 h-1 rounded-full bg-amber-400/30 group-hover/arsenal:bg-amber-400 group-hover/arsenal:animate-pulse" />
										<span className="truncate">{skill}</span>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</SectionReveal>
		</section>
	);
}

function SkillCard({
	cat,
	index,
	isLarge,
}: {
	cat: PortfolioData["skillCategories"][0];
	index: number;
	isLarge: boolean;
}) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);

	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;
		x.set(xPct);
		y.set(yPct);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			viewport={{ once: true }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX,
				rotateY,
				transformStyle: "preserve-3d",
			}}
			className={`group relative p-8 rounded-[2rem] bg-white border border-black/[0.06] shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden transform-gpu will-change-transform ${
				isLarge ? "lg:col-span-2" : "lg:col-span-1"
			}`}
		>
			{/* Glass reflection */}
			<div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none group-hover:opacity-60 transition-opacity" />

			{/* Liquid accent blob */}
			<div
				className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[30px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
				style={{ backgroundColor: cat.color }}
			/>

			{/* Card Content */}
			<div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(50px)" }}>
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-3">
						<div
							className="w-3 h-3 rounded-full"
							style={{
								backgroundColor: cat.color,
								boxShadow: `0 0 15px ${cat.color}`,
							}}
						/>
						<h3 className="font-display font-bold text-xl text-gray-900 tracking-tight">
							{cat.category}
						</h3>
					</div>
					<span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold bg-black/[0.02] px-2.5 py-1 rounded-lg">
						{cat.skills.length} Stacked
					</span>
				</div>

				<div className="grid grid-cols-2 gap-x-5 gap-y-6 flex-1">
					{cat.skills.map((skill) => {
						const Icon = iconMap[skill.icon];
						return (
							<div key={skill.name} className="flex flex-col gap-3 group/skill">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shadow-sm group-hover/skill:scale-110 group-hover/skill:shadow-md transition-all shrink-0">
										{Icon ? <Icon size={16} style={{ color: cat.color }} /> : "⚡"}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-[11px] font-bold text-gray-800 truncate leading-tight">
											{skill.name}
										</p>
										<p className="text-[9px] text-gray-400 font-medium uppercase tracking-tight">
											Level: {skill.level}%
										</p>
									</div>
								</div>

								{/* Premium Mastery Gauge */}
								<div className="h-1.5 rounded-full bg-black/[0.03] overflow-hidden relative">
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: `${skill.level}%` }}
										viewport={{ once: true }}
										transition={{ duration: 1.5, ease: "circOut" }}
										className="h-full rounded-full relative"
										style={{ backgroundColor: cat.color }}
									>
										<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
										<div className="absolute inset-0 animate-pulse bg-white/10" />
									</motion.div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
}
