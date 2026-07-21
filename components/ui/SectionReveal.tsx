"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
	children: ReactNode;
	delay?: number;
	direction?: "up" | "down" | "left" | "right";
}

export function SectionReveal({ children, delay = 0, direction = "up" }: SectionRevealProps) {
	const directions = {
		up: { y: 40 },
		down: { y: -40 },
		left: { x: 40 },
		right: { x: -40 },
	};

	return (
		<motion.div
			className="relative"
			initial={{
				opacity: 0,
				...directions[direction],
				filter: "blur(10px)",
			}}
			whileInView={{
				opacity: 1,
				x: 0,
				y: 0,
				filter: "blur(0px)",
			}}
			viewport={{ once: true, margin: "-100px" }}
			transition={{
				duration: 0.8,
				delay,
				ease: [0.21, 0.47, 0.32, 0.98],
			}}
		>
			{children}
		</motion.div>
	);
}
