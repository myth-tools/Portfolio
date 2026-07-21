"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ name, title }: { name: string; title: string }) {
	const [isVisible, setIsVisible] = useState(true);
	const [step, setStep] = useState(0);

	useEffect(() => {
		// High-Level Animation Timeline
		const timers = [
			setTimeout(() => setStep(1), 1200), // Liquid Pearl Merge
			setTimeout(() => setStep(2), 2800), // 3D Glass Reveal & Identity
			setTimeout(() => setStep(3), 4500), // Light Sweep & Finalize
			setTimeout(() => setIsVisible(false), 5500), // Smooth Exit
		];
		return () => timers.forEach(clearTimeout);
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{
						opacity: 0,
						scale: 1.05,
						filter: "blur(10px)",
						transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
					}}
					className="fixed inset-0 z-[9999] bg-[#FAF9F6] flex items-center justify-center overflow-hidden transform-gpu"
				>
					{/* Performance-Optimized SVG Liquid Filter — Applied only to the core */}
					<svg className="hidden" aria-hidden="true">
						<defs>
							<filter id="liquid-pearl">
								<feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
								<feColorMatrix
									in="blur"
									mode="matrix"
									values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
									result="liquid"
								/>
								<feComposite in="SourceGraphic" in2="liquid" operator="atop" />
							</filter>
						</defs>
					</svg>

					{/* Subtle Premium Background Glows */}
					<div className="absolute inset-0 pointer-events-none overflow-hidden">
						<motion.div
							animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
							transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
							className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A84C]/10 to-transparent rounded-full transform-gpu"
						/>
						<motion.div
							animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
							transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
							className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 to-transparent rounded-full transform-gpu"
						/>
					</div>

					<div className="relative flex items-center justify-center">
						{/* Phase 1: Liquid Morphism Core */}
						<div
							style={{ filter: "url(#liquid-pearl)" }}
							className="absolute flex items-center justify-center w-64 h-64"
						>
							<motion.div
								initial={{ x: -60, scale: 0.5 }}
								animate={{
									x: step >= 1 ? 0 : -30,
									scale: step >= 0 ? 1 : 0.5,
								}}
								transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
								className="absolute w-24 h-24 bg-[#C9A84C]/20 rounded-full mix-blend-multiply"
							/>
							<motion.div
								initial={{ x: 60, scale: 0.5 }}
								animate={{
									x: step >= 1 ? 0 : 30,
									scale: step >= 0 ? 1 : 0.5,
								}}
								transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
								className="absolute w-32 h-32 bg-gray-200 rounded-full mix-blend-multiply"
							/>
						</div>

						{/* Phase 2: 3D Glassmorphism Monolith */}
						<motion.div
							initial={{ scale: 0.8, opacity: 0, rotateY: 45, rotateX: 20 }}
							animate={{
								scale: step >= 1 ? 1 : 0.8,
								opacity: step >= 1 ? 1 : 0,
								rotateY: step >= 2 ? [0, 5, -5, 0] : 45,
								rotateX: step >= 2 ? [-5, 0, -5] : 20,
								y: step >= 2 ? [0, -10, 0] : 0,
							}}
							transition={{
								duration: step >= 2 ? 6 : 2.5,
								repeat: step >= 2 ? Infinity : 0,
								ease: step >= 2 ? "easeInOut" : [0.16, 1, 0.3, 1],
							}}
							className="relative z-10 perspective-2000"
						>
							{/* 3D Liquid Glass Container — Organic Shape Animation */}
							<motion.div
								animate={{
									borderRadius: [
										"40% 60% 70% 30% / 40% 50% 60% 50%",
										"30% 60% 70% 40% / 50% 60% 30% 60%",
										"40% 60% 70% 30% / 40% 50% 60% 50%",
									],
								}}
								transition={{
									duration: 8,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] bg-white/40 backdrop-blur-xl border border-white/80 shadow-[0_40px_80px_rgba(0,0,0,0.08),inset_0_4px_8px_rgba(255,255,255,0.8)] flex items-center justify-center overflow-hidden transform-gpu ring-1 ring-black/[0.02]"
							>
								{/* Liquid Refraction Layer */}
								<div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-40 pointer-events-none" />

								{/* Gilded Inner Edge — Animated to match organic shape */}
								<motion.div
									animate={{
										borderRadius: [
											"40% 60% 70% 30% / 40% 50% 60% 50%",
											"30% 60% 70% 40% / 50% 60% 30% 60%",
											"40% 60% 70% 30% / 40% 50% 60% 50%",
										],
									}}
									transition={{
										duration: 8,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="absolute inset-0 border border-[#C9A84C]/20 pointer-events-none scale-[0.98]"
								/>

								{/* High-Level Transition: Refractive Light Sweep */}
								<motion.div
									animate={{ x: ["-100%", "200%"] }}
									transition={{
										duration: 3.5,
										repeat: Infinity,
										ease: "easeInOut",
										repeatDelay: 1,
									}}
									className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] pointer-events-none"
								/>

								<AnimatePresence mode="wait">
									{step < 2 ? (
										<motion.div
											key="init"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 1.1 }}
											className="flex flex-col items-center gap-4"
										>
											<div className="relative w-8 h-8 rounded-full border-2 border-[#C9A84C]/20 flex items-center justify-center">
												<motion.div
													animate={{ rotate: 360 }}
													transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
													className="w-full h-full rounded-full border-t-2 border-[#C9A84C]"
												/>
											</div>
											<span className="text-[9px] font-black text-gray-400 tracking-[0.5em] uppercase">
												Initializing
											</span>
										</motion.div>
									) : (
										<motion.div
											key="identity"
											initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
											animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
											transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
											className="flex flex-col items-center gap-6"
										>
											{/* Premium Typography Combination */}
											<div className="relative flex flex-col items-center justify-center text-center">
												<span className="font-serif italic text-5xl md:text-7xl text-gray-900/5 absolute -top-10 md:-top-14 select-none pointer-events-none whitespace-nowrap">
													{title.split(" ").pop()}
												</span>
												<span className="font-display text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter uppercase relative z-10 drop-shadow-sm px-4">
													{name}
													<span className="text-[#C9A84C]">.</span>
												</span>
											</div>

											{/* Technical Tagline */}
											<div className="flex items-center gap-4">
												<div className="h-[1px] w-8 bg-gray-200" />
												<span className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase">
													{title}
												</span>
												<div className="h-[1px] w-8 bg-gray-200" />
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						</motion.div>
					</div>

					{/* Minimalist Luxury Footer HUD */}
					<div className="absolute bottom-12 w-full flex flex-col items-center gap-6 opacity-60">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1 }}
							className="flex items-center gap-3"
						>
							<div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
							<span className="text-[9px] font-bold text-gray-500 tracking-[0.3em] uppercase">
								Secure Connection Established
							</span>
						</motion.div>

						{/* Cinematic Loading Line */}
						<div className="w-48 h-[1px] bg-gray-200 relative overflow-hidden">
							<motion.div
								initial={{ x: "-100%" }}
								animate={{ x: "0%" }}
								transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
								className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
							/>
						</div>
					</div>

					{/* High Quality Noise Texture (Overlay) */}
					<div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none" />
				</motion.div>
			)}
		</AnimatePresence>
	);
}
