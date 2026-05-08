"use client";

import {
	type MotionValue,
	motion,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	type Variants,
} from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaAws, FaGithub, FaLinkedin } from "react-icons/fa";
/* ─── Floating Code Visual ─────────────────────────────────────────────────── */
import {
	SiDjango,
	SiDocker,
	SiFastapi,
	SiLaravel,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiReact,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
	"Next.js": SiNextdotjs,
	React: SiReact,
	TypeScript: SiTypescript,
	"Node.js": SiNodedotjs,
	Django: SiDjango,
	FastAPI: SiFastapi,
	Tailwind: SiTailwindcss,
	Laravel: SiLaravel,
	PostgreSQL: SiPostgresql,
	MySQL: SiMysql,
	MongoDB: SiMongodb,
	Docker: SiDocker,
	AWS: FaAws,
};

function NebulaTag({
	tag,
	springX,
	springY,
}: {
	tag: {
		label: string;
		x: number;
		y: number;
		z: number;
		Icon: React.ElementType;
		delay: number;
		scale: number;
		opacity: number;
	};
	springX: MotionValue<number>;
	springY: MotionValue<number>;
}) {
	const x = useTransform(springX, (v: number) => tag.x + v * (tag.z / 50));
	const y = useTransform(springY, (v: number) => tag.y + v * (tag.z / 50));

	return (
		<motion.div
			className="absolute z-30 group"
			style={{
				x,
				y,
				scale: tag.scale,
				opacity: tag.opacity,
			}}
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: tag.opacity, scale: tag.scale }}
			transition={{ delay: tag.delay, type: "spring", stiffness: 100 }}
		>
			<div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/[0.05] shadow-xl hover:shadow-2xl hover:bg-black hover:text-white transition-all duration-500 cursor-default group">
				<tag.Icon className="text-lg group-hover:scale-110 transition-transform" />
				<span className="font-display font-bold text-[11px] tracking-wider uppercase whitespace-nowrap">
					{tag.label}
				</span>
			</div>
		</motion.div>
	);
}

function FloatingCodeVisual({ personalInfo }: { personalInfo: PortfolioData["personalInfo"] }) {
	const { name, constellationTechs: techs, developerStatus, developerFocus } = personalInfo;
	const [mounted, setMounted] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
	const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

	useEffect(() => {
		setMounted(true);
		const handleMove = (e: MouseEvent) => {
			mouseX.set((e.clientX / window.innerWidth - 0.5) * 50);
			mouseY.set((e.clientY / window.innerHeight - 0.5) * 50);
		};
		window.addEventListener("mousemove", handleMove);
		return () => window.removeEventListener("mousemove", handleMove);
	}, [mouseX, mouseY]);

	const nebulaTags = techs.map((label, i) => {
		// Use a golden-ratio based spiral for "unique" organic distribution
		const phi = (Math.sqrt(5) + 1) / 2; // Golden ratio
		const angle = (i * 2 * Math.PI) / phi;
		const radius = 180 + i * 12; // Expanding spiral
		const z = Math.sin(i * 0.5) * 100; // Simulated 3D depth

		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;

		return {
			label,
			x,
			y,
			z,
			Icon: iconMap[label] || Sparkles,
			delay: 0.5 + i * 0.05,
			scale: 0.8 + (z + 100) / 400, // Depth scaling
			opacity: 0.4 + (z + 100) / 200, // Depth opacity
		};
	});

	const centralX = useTransform(springX, (v) => (v as number) * 0.5);
	const centralY = useTransform(springY, (v) => (v as number) * 0.5);
	const centralRotateX = useTransform(springY, (v) => (v as number) * -0.1);
	const centralRotateY = useTransform(springX, (v) => (v as number) * 0.1);

	return (
		<div className="relative w-full h-[700px] flex items-center justify-center perspective-1000">
			{/* Connective Constellation Lines (SVG) */}
			<svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
				<title>Technical Galaxy Constellation</title>
				{mounted &&
					nebulaTags.map((tag, i) => (
						<motion.line
							key={`line-${tag.label}`}
							x1="50%"
							y1="50%"
							x2={`calc(50% + ${tag.x}px)`}
							y2={`calc(50% + ${tag.y}px)`}
							stroke="currentColor"
							strokeWidth="0.5"
							className="text-black/[0.03]"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ delay: 1 + i * 0.05, duration: 1.5 }}
						/>
					))}
			</svg>

			{/* Decorative ambient rings */}
			<motion.div
				style={{ x: springX, y: springY }}
				className="absolute w-[500px] h-[500px] rounded-full border border-black/[0.03] animate-pulse-slow"
			/>

			{/* Central Architecture Card */}
			<motion.div
				style={{
					x: centralX,
					y: centralY,
					rotateX: centralRotateX,
					rotateY: centralRotateY,
				}}
				className="relative z-20 bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-black/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-10 w-[320px] transform-gpu"
				initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
				animate={{ opacity: 1, scale: 1, rotateX: 0 }}
				transition={{ duration: 1, ease: "circOut" }}
			>
				<div className="flex gap-2 mb-8">
					<div className="w-3 h-3 rounded-full bg-red-400/40" />
					<div className="w-3 h-3 rounded-full bg-yellow-400/40" />
					<div className="w-3 h-3 rounded-full bg-green-400/40" />
				</div>
				<div className="font-mono text-xs md:text-sm leading-relaxed">
					<p>
						<span className="text-violet-500">const</span>{" "}
						<span className="text-sky-600">developer</span> = {"{"}
					</p>
					<p className="pl-6 text-emerald-600">
						name: <span className="text-orange-500">&quot;{name}&quot;</span>,
					</p>
					<p className="pl-6 text-emerald-600">
						status:{" "}
						<span className="text-orange-500">&quot;{developerStatus || "Expert"}&quot;</span>,
					</p>
					<p className="pl-6 text-emerald-600">
						focus:{" "}
						<span className="text-orange-500">&quot;{developerFocus || "Innovation"}&quot;</span>
					</p>
					<p>{"};"}</p>
				</div>
			</motion.div>

			{/* 3D Nebula Tags */}
			{mounted &&
				nebulaTags.map((tag) => (
					<NebulaTag key={tag.label} tag={tag} springX={springX} springY={springY} />
				))}
		</div>
	);
}

export default function Hero({
	personalInfo,
	stats,
}: {
	personalInfo: PortfolioData["personalInfo"];
	stats: PortfolioData["stats"];
}) {
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayed, setDisplayed] = useState("");
	const [typing, setTyping] = useState(true);
	const [charIndex, setCharIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollY } = useScroll();
	const yParallax = useTransform(scrollY, [0, 500], [0, 80]);
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);

	// Mouse tracking for interactive background
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
	const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Normalize to -0.5 to 0.5 range for more efficient transform math
			mouseX.set(e.clientX / window.innerWidth - 0.5);
			mouseY.set(e.clientY / window.innerHeight - 0.5);
		};
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	// Typing animation logic
	useEffect(() => {
		const roles = personalInfo.heroRoles;
		const current = roles[roleIndex];
		if (typing) {
			if (charIndex < current.length) {
				const t = setTimeout(() => {
					setDisplayed(current.slice(0, charIndex + 1));
					setCharIndex((c) => c + 1);
				}, 50);
				return () => clearTimeout(t);
			} else {
				const t = setTimeout(() => setTyping(false), 2500);
				return () => clearTimeout(t);
			}
		} else if (charIndex > 0) {
			const t = setTimeout(() => {
				setDisplayed(current.slice(0, charIndex - 1));
				setCharIndex((c) => c - 1);
			}, 25);
			return () => clearTimeout(t);
		} else {
			setRoleIndex((r) => (r + 1) % roles.length);
			setTyping(true);
		}
	}, [charIndex, typing, roleIndex, personalInfo.heroRoles]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.12, delayChildren: 0.2 },
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
		visible: {
			y: 0,
			opacity: 1,
			filter: "blur(0px)",
			transition: { type: "spring", stiffness: 60, damping: 20 },
		},
	};

	return (
		<section
			id="hero"
			ref={containerRef}
			className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden will-change-opacity will-change-transform"
		>
			{/* Mesh Gradient Background */}
			<div className="mesh-gradient transform-gpu">
				<motion.div
					style={{
						x: useTransform(springX, [-0.5, 0.5], [-30, 30]),
						y: useTransform(springY, [-0.5, 0.5], [-30, 30]),
					}}
					className="absolute top-[-5%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-200/20 to-blue-200/10 blur-[80px] pointer-events-none transform-gpu will-change-transform"
				/>
				<motion.div
					style={{ y: yParallax }}
					className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-amber-100/20 to-rose-100/10 blur-[80px] pointer-events-none animate-pulse-glow transform-gpu"
				/>
				<motion.div
					style={{ y: useTransform(scrollY, [0, 500], [0, -60]) }}
					className="absolute bottom-[5%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tl from-emerald-100/10 to-cyan-100/10 blur-[60px] pointer-events-none animate-mesh transform-gpu"
				/>
			</div>

			{/* Subtle grid */}
			<div
				className="absolute inset-0 pointer-events-none z-0 opacity-[0.35]"
				style={{
					backgroundImage: `
						radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)
					`,
					backgroundSize: "40px 40px",
				}}
			/>

			<SectionReveal direction="up" delay={0.1}>
				<div className="container-custom relative z-10 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
						{/* Left: Content */}
						<motion.div
							className="max-w-2xl"
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							{/* Availability Badge */}
							<motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
								<div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-black/[0.06] shadow-sm">
									<span className="relative flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
										<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
									</span>
									<span className="font-mono text-[10px] md:text-xs font-bold text-gray-600 tracking-widest uppercase">
										{personalInfo.availability}
									</span>
								</div>
								<div className="h-[1px] w-6 bg-black/10" />
								<span className="font-mono text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">
									{personalInfo.location}
								</span>
							</motion.div>

							{/* Main Headline */}
							<motion.div variants={itemVariants} className="relative mb-8">
								<span className="text-gray-400 block mb-2 text-xl md:text-2xl font-light tracking-tight">
									I&apos;m
								</span>
								<h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] mb-6 tracking-[-0.05em] text-gray-900">
									{personalInfo.name}
									<span className="text-gradient-accent">.</span>
								</h1>

								<div className="flex flex-wrap items-center gap-4">
									<div className="px-3 py-1 border border-black/[0.08] rounded-lg bg-white/60 backdrop-blur-sm font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
										<Sparkles size={10} className="text-amber-500" />
										Expert
									</div>
									<h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-500 font-medium tracking-tight">
										<span className="text-gray-900 text-shimmer">{personalInfo.title}</span>
									</h2>
								</div>
							</motion.div>

							{/* Tagline / Roles */}
							<motion.div variants={itemVariants} className="mb-12 max-w-xl">
								<div className="flex gap-4">
									<div className="w-[2px] rounded-full bg-gradient-to-b from-amber-400 to-transparent" />
									<p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
										Building <span className="text-gray-900 font-medium">{displayed}</span>
										<motion.span
											animate={{ opacity: [1, 0] }}
											transition={{ repeat: Infinity, duration: 0.8 }}
											className="inline-block w-[2px] h-[0.85em] bg-amber-500 ml-0.5 align-middle"
										/>
										<br />
										<span className="mt-4 block text-base opacity-60 leading-relaxed">
											{personalInfo.tagline}
										</span>
									</p>
								</div>
							</motion.div>

							{/* CTAs & Socials */}
							<motion.div
								variants={itemVariants}
								className="flex flex-col sm:flex-row sm:items-center gap-6 mb-16"
							>
								<div className="flex flex-wrap gap-4">
									<Magnetic>
										<a href="#projects" className="btn-primary">
											View Projects
											<ArrowRight
												size={16}
												className="transition-transform group-hover:translate-x-1"
											/>
										</a>
									</Magnetic>

									<Magnetic>
										<a
											href={personalInfo.resumeUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="btn-secondary"
										>
											<Download
												size={16}
												className="text-gray-400 group-hover:text-amber-500 transition-colors"
											/>
											Resume
										</a>
									</Magnetic>
								</div>

								<div className="flex items-center gap-4 sm:ml-2 sm:pl-6 sm:border-l sm:border-black/10">
									{[
										{ icon: FaGithub, href: personalInfo.github, label: "GitHub" },
										{ icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
									].map(({ icon: Icon, href, label }) => (
										<a
											key={label}
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm border border-black/[0.06] flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-black/[0.15] hover:shadow-md transition-all hover:-translate-y-0.5"
											title={label}
										>
											<Icon size={18} />
										</a>
									))}
								</div>
							</motion.div>

							{/* Stats - Ultra Premium Refinement */}
							<motion.div
								variants={itemVariants}
								className="flex flex-wrap items-center gap-6 md:gap-10 pt-4 border-t border-black/[0.03]"
							>
								{stats.map((stat) => (
									<div key={stat.label} className="group flex flex-col gap-0.5">
										<div className="flex items-baseline gap-1">
											<span className="font-display text-4xl md:text-5xl text-gray-900 tracking-tighter group-hover:text-amber-500 transition-colors duration-500">
												{stat.number}
											</span>
											<div className="w-1.5 h-1.5 rounded-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors duration-500" />
										</div>
										<span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] whitespace-nowrap">
											{stat.label}
										</span>
									</div>
								))}
							</motion.div>
						</motion.div>

						{/* Right: Visual */}
						<motion.div
							className="hidden lg:block"
							initial={{ opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.5, duration: 1, type: "spring" }}
						>
							<FloatingCodeVisual personalInfo={personalInfo} />
						</motion.div>
					</div>
				</div>
			</SectionReveal>

			{/* Scroll Indicator */}
			<motion.div
				style={{ opacity }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
			>
				<span className="text-[9px] tracking-[0.4em] uppercase font-bold text-gray-400">
					Scroll
				</span>
				<div className="w-5 h-8 rounded-full border-2 border-black/10 relative overflow-hidden">
					<motion.div
						animate={{ y: [0, 16, 0] }}
						transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
						className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-400 rounded-full"
					/>
				</div>
			</motion.div>
		</section>
	);
}
