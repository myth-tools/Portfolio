"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
	size?: number;
	className?: string;
	showText?: boolean;
	name?: string;
	/** "dark" for use on white bg (default), "light" for use on dark bg */
	variant?: "dark" | "light";
}

/**
 * Industry-grade Logo component for the portfolio.
 * Adapts to both white-background (dark variant) and dark-background (light variant) contexts.
 */
export function Logo({ size = 40, className, showText = true, name, variant = "dark" }: LogoProps) {
	const isDark = variant === "dark";

	return (
		<div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
			{/* Logo Icon Container — Kinetic Morphing Design */}
			<motion.div
				style={{ width: size, height: size }}
				whileHover={{
					scale: 1.1,
					rotateY: 15,
					rotateX: -10,
				}}
				animate={{
					borderRadius: [
						"30% 70% 70% 30% / 30% 30% 70% 70%",
						"50% 50% 20% 80% / 25% 80% 20% 75%",
						"30% 70% 70% 30% / 30% 30% 70% 70%",
					],
				}}
				transition={{
					borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
					default: { type: "spring", stiffness: 300, damping: 20 },
				}}
				className={cn(
					"relative flex items-center justify-center transition-all duration-500 overflow-hidden shadow-lg transform-gpu perspective-1000",
					isDark
						? "bg-white/40 backdrop-blur-md border border-black/[0.08] group-hover:border-amber-500/30"
						: "bg-white/[0.06] backdrop-blur-md border border-white/[0.15] group-hover:border-amber-400/50",
				)}
			>
				{/* Inner Gilded Pulse Ring */}
				<motion.div
					animate={{
						opacity: [0.1, 0.3, 0.1],
						scale: [0.9, 1.05, 0.9],
					}}
					transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
					className="absolute inset-0 border border-amber-500/20 rounded-full"
				/>

				{/* Refractive Light Sweep */}
				<motion.div
					animate={{ x: ["-100%", "200%"] }}
					transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
					className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
				/>

				{/* Logo Image */}
				{/* biome-ignore lint/performance/noImgElement: Using motion.img for animation */}
				<motion.img
					src="/logo.png"
					alt="Website Logo"
					className="w-1/2 h-1/2 object-contain group-hover:scale-110 transition-transform duration-700 ease-out relative z-10"
					initial={false}
				/>
			</motion.div>

			{/* Brand Name Text */}
			{showText && name && (
				<span
					className={cn(
						"flex items-baseline font-display font-bold text-lg tracking-wide transition-colors",
						isDark ? "text-gray-900" : "text-white",
					)}
				>
					{name}
					<motion.span
						animate={{ rotate: [0, 90, 180, 270, 360] }}
						transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
						className={cn(
							"inline-block ml-[2px] w-1.5 h-1.5 shadow-[0_0_8px_rgba(201,168,76,0.4)]",
							isDark
								? "bg-gradient-to-tr from-amber-500 to-amber-300"
								: "bg-gradient-to-tr from-amber-400 to-amber-200",
						)}
						style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
					/>
				</span>
			)}
		</div>
	);
}
