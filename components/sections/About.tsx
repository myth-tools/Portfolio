"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
	Award,
	Brain,
	Code,
	Cpu,
	Database,
	ExternalLink,
	Globe,
	Layers,
	type LucideIcon,
	Mail,
	MapPin,
	Shield,
	Target,
	Zap,
} from "lucide-react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { Certification, PortfolioData } from "@/lib/schema";

const highlights = [
	{
		icon: Code,
		color: "#8b5cf6",
		title: "Clean Architecture",
		description:
			"I write maintainable code with SOLID principles and best practices at the forefront.",
		size: "large",
	},
	{
		icon: Zap,
		color: "#f59e0b",
		title: "Performance First",
		description: "Speed is a feature. I target 90+ Lighthouse scores on every build.",
		size: "small",
	},
	{
		icon: Layers,
		color: "#0ea5e9",
		title: "Full-Stack Depth",
		description: "From React UIs to Django APIs to DevOps — I own the entire stack.",
		size: "small",
	},
	{
		icon: Cpu,
		color: "#10b981",
		title: "AI Integration",
		description: "Expertly weaving LLMs and AI patterns into production workflows.",
		size: "large",
	},
];

export default function About({
	personalInfo,
	engineeringPhilosophy,
	certifications,
}: {
	personalInfo: PortfolioData["personalInfo"];
	engineeringPhilosophy: PortfolioData["engineeringPhilosophy"];
	certifications: PortfolioData["certifications"];
}) {
	return (
		<section
			id="about"
			className="section-padding relative overflow-hidden bg-[#fafafa]/20 contain-paint will-change-opacity will-change-transform"
		>
			{/* Ambient Light Orbs */}
			<div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-amber-50/10 blur-[140px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-violet-50/10 blur-[120px] rounded-full pointer-events-none" />

			<SectionReveal direction="up">
				<div className="container-custom relative z-10">
					{/* Header */}
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
						<div className="max-w-2xl">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className="section-badge mb-4"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
								Identity
							</motion.div>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900"
							>
								The Person{" "}
								<span className="font-serif italic font-normal text-gray-400">Behind Code</span>
							</motion.h2>
						</div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-gray-500 max-w-sm text-lg leading-relaxed font-light"
						>
							A synthesis of engineering precision, creative problem solving, and a relentless drive
							for excellence.
						</motion.p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
						{/* Left: Premium Profile Card */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="lg:col-span-7"
						>
							<ProfilePanel personalInfo={personalInfo} />
						</motion.div>

						{/* Right: Highlights Bento */}
						<div className="lg:col-span-5 grid grid-cols-2 gap-4">
							{highlights.map((item, index) => (
								<AboutHighlight key={item.title} item={item} index={index} />
							))}
						</div>
					</div>

					{/* Cinematic Philosophy Hub */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="relative p-10 md:p-16 rounded-[3rem] bg-white border border-black/[0.05] shadow-2xl overflow-hidden group"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] to-transparent pointer-events-none" />
						<div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/40 blur-[100px] rounded-full pointer-events-none translate-x-24 -translate-y-24" />

						<div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
							<div className="max-w-xl">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-white shadow-lg">
										<Target size={20} />
									</div>
									<h3 className="font-display font-bold text-gray-900 text-2xl tracking-tight uppercase">
										Engineering Philosophy
									</h3>
								</div>
								<p className="font-serif text-2xl md:text-3xl text-gray-800 leading-tight italic border-l-4 border-amber-400 pl-8 mb-4">
									&quot;{engineeringPhilosophy.quote}&quot;
								</p>
							</div>

							<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 max-w-md lg:justify-end w-full">
								{engineeringPhilosophy.principles.map((principle, i) => (
									<motion.div
										key={principle}
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ delay: i * 0.1 }}
										className="px-4 py-2.5 rounded-xl bg-gray-50 border border-black/[0.04] text-[10px] font-bold text-gray-500 hover:text-amber-700 hover:border-amber-200 hover:bg-amber-50 transition-all cursor-default shadow-sm flex items-center gap-2 group/tag"
									>
										<div className="w-1 h-1 rounded-full bg-amber-400 group-hover/tag:animate-pulse" />
										<span className="truncate">{principle}</span>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* Verified Certificates Grid */}
					<div className="mt-44">
						<div className="flex items-center gap-4 mb-12">
							<div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-black/[0.05]" />
							<h3 className="font-display font-bold text-gray-400 text-sm tracking-[0.3em] uppercase">
								Verified Certificates
							</h3>
							<div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-black/[0.05]" />
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{certifications.map((cert, i) => (
								<CertificationCard key={cert.name} cert={cert} index={i} />
							))}
						</div>
					</div>
				</div>
			</SectionReveal>
		</section>
	);
}

function ProfilePanel({ personalInfo }: { personalInfo: PortfolioData["personalInfo"] }) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		x.set((e.clientX - rect.left) / rect.width - 0.5);
		y.set((e.clientY - rect.top) / rect.height - 0.5);
	};

	return (
		<motion.div
			onMouseMove={handleMouseMove}
			onMouseLeave={() => {
				x.set(0);
				y.set(0);
			}}
			style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			className="glass-card p-10 md:p-12 h-full relative overflow-hidden group shadow-2xl transform-gpu"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none" />

			<div
				className="relative z-10 flex flex-col md:flex-row gap-10 items-start"
				style={{ transform: "translateZ(40px)" }}
			>
				<div className="relative flex-shrink-0">
					{personalInfo.showProfilePhoto && personalInfo.profilePhoto ? (
						<div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-2 border-black/5 shadow-2xl group-hover:rotate-3 transition-transform duration-700 relative">
							<Image
								src={personalInfo.profilePhoto}
								alt={personalInfo.name}
								fill
								className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
								sizes="(max-width: 768px) 128px, 160px"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
						</div>
					) : (
						<div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden group-hover:rotate-6 transition-transform duration-500">
							<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
							👨‍💻
						</div>
					)}
					<div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-400 border-4 border-white shadow-lg animate-pulse" />
				</div>

				<div className="flex-1">
					<div className="mb-6">
						<h3 className="font-display font-bold text-3xl text-gray-900 tracking-tight mb-2">
							{personalInfo.name}
						</h3>
						<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
							<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.04]">
								<MapPin size={14} className="text-amber-500" />
								{personalInfo.location}
							</div>
							<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.04]">
								<Mail size={14} className="text-violet-500" />
								{personalInfo.email}
							</div>
						</div>
					</div>

					<p className="text-gray-700 text-xl leading-relaxed mb-6 font-light italic font-serif">
						&quot;{personalInfo.bio}&quot;
					</p>
					<p className="text-gray-500 leading-relaxed text-base font-light">
						{personalInfo.bioExtended}
					</p>
				</div>
			</div>
		</motion.div>
	);
}

interface AboutHighlightItem {
	icon: LucideIcon;
	color: string;
	title: string;
	description: string;
	size: string;
}

function AboutHighlight({ item, index }: { item: AboutHighlightItem; index: number }) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			viewport={{ once: true }}
			onMouseMove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				x.set(e.clientX - rect.left / rect.width - 0.5);
				y.set(e.clientY - rect.top / rect.height - 0.5);
			}}
			onMouseLeave={() => {
				x.set(0);
				y.set(0);
			}}
			style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			className={`group relative p-8 rounded-[2rem] bg-white border border-black/[0.04] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${
				item.size === "large" ? "col-span-2" : "col-span-1"
			}`}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none" />
			<div
				className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[30px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
				style={{ backgroundColor: item.color }}
			/>

			<div className="relative z-10 flex flex-col gap-4" style={{ transform: "translateZ(30px)" }}>
				<div
					className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm border border-black/[0.02]"
					style={{ backgroundColor: `${item.color}10` }}
				>
					<item.icon size={18} style={{ color: item.color }} />
				</div>
				<div>
					<h3 className="font-display font-bold text-gray-900 text-sm mb-1 tracking-tight">
						{item.title}
					</h3>
					<p className="text-xs text-gray-500 leading-relaxed font-light">{item.description}</p>
				</div>
			</div>
		</motion.div>
	);
}

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
	const getIcon = (name: string) => {
		if (name.includes("Cyber")) {
			return <Shield size={18} className="text-emerald-500" />;
		}
		if (name.includes("AI") || name.includes("Machine")) {
			return <Brain size={18} className="text-amber-500" />;
		}
		if (name.includes("Data")) {
			return <Database size={18} className="text-violet-500" />;
		}
		if (name.includes("IELTS")) {
			return <Globe size={18} className="text-blue-500" />;
		}
		return <Award size={18} className="text-blue-500" />;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			viewport={{ once: true }}
			className="group p-6 rounded-3xl bg-white border border-black/[0.04] shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
		>
			<div>
				<div className="flex items-center justify-between mb-4">
					<div className="w-10 h-10 rounded-2xl bg-gray-50 border border-black/[0.02] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
						{getIcon(cert.name)}
					</div>
					<div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
						{cert.date}
					</div>
				</div>
				<h4 className="font-display font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-amber-600 transition-colors">
					{cert.name}
				</h4>
				<p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-4">
					{cert.issuer}
				</p>
			</div>

			<div className="flex items-center justify-between pt-4 border-t border-black/[0.02]">
				<span className="text-[9px] font-mono text-gray-400 truncate max-w-[120px]">
					ID: {cert.id || "VERIFIED"}
				</span>
				{cert.link && (
					<a
						href={cert.link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[10px] font-bold text-amber-500 flex items-center gap-1 hover:gap-2 transition-all"
					>
						Verify <ExternalLink size={10} />
					</a>
				)}
			</div>
		</motion.div>
	);
}
