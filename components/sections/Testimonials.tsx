"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, Star } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData } from "@/lib/data";

export default function Testimonials({
	testimonials,
}: {
	testimonials: PortfolioData["testimonials"];
}) {
	return (
		<section
			id="testimonials"
			className="section-padding relative overflow-hidden bg-[#fafafa]/20 contain-paint will-change-opacity will-change-transform"
		>
			{/* Luxury Background Elements */}
			<div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-amber-50/10 blur-[80px] rounded-full pointer-events-none transform-gpu" />
			<div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-violet-50/10 blur-[80px] rounded-full pointer-events-none transform-gpu" />

			<SectionReveal direction="up">
				<div className="container-custom relative z-10">
					{/* Header */}
					<div className="text-center mb-24">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="section-badge mb-6"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
							Social Proof
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6"
						>
							Trusted by{" "}
							<span className="font-serif italic font-normal text-gray-400">Innovators</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed font-light"
						>
							Reflections on collaboration, technical impact, and successful product deliveries.
						</motion.p>
					</div>

					{/* High-Fidelity Marquee Gallery */}
					<div className="relative space-y-10">
						{/* Gradient Masks */}
						<div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#fafafa] to-transparent z-20 pointer-events-none" />
						<div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#fafafa] to-transparent z-20 pointer-events-none" />

						{/* Row 1 — Forward Momentum */}
						<div className="flex gap-8 w-max animate-marquee transform-gpu">
							{testimonials.map((t) => (
								<TestimonialCard key={`r1-orig-${t.id}`} testimonial={t} />
							))}
							{testimonials.map((t) => (
								<TestimonialCard key={`r1-dupe-${t.id}`} testimonial={t} />
							))}
						</div>

						{/* Row 2 — Counter-Balance */}
						<div className="flex gap-8 w-max animate-marquee-reverse transform-gpu">
							{[...testimonials].reverse().map((t) => (
								<TestimonialCard key={`r2-orig-${t.id}`} testimonial={t} />
							))}
							{[...testimonials].reverse().map((t) => (
								<TestimonialCard key={`r2-dupe-${t.id}`} testimonial={t} />
							))}
						</div>
					</div>
				</div>
			</SectionReveal>
		</section>
	);
}

function TestimonialCard({ testimonial }: { testimonial: PortfolioData["testimonials"][number] }) {
	return (
		<motion.div
			whileHover={{ y: -8, scale: 1.02 }}
			className="w-[420px] shrink-0 flex flex-col gap-6 bg-white border border-black/[0.04] rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-700 relative overflow-hidden group transform-gpu will-change-transform"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none" />
			<div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/20 blur-[30px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

			<div className="relative z-10 flex items-start justify-between">
				<div className="w-12 h-12 rounded-2xl bg-gray-50 border border-black/[0.05] flex items-center justify-center shadow-sm">
					<Quote size={20} className="text-amber-500" />
				</div>
				<div className="flex gap-1 items-center px-3 py-1 rounded-full bg-black/[0.02] border border-black/[0.04]">
					{[1, 2, 3, 4, 5].map((id) => (
						<Star key={id} size={10} className="text-amber-400" fill="#FBBF24" />
					))}
				</div>
			</div>

			<p className="relative z-10 text-gray-700 leading-relaxed flex-1 font-light italic serif font-serif text-lg">
				&ldquo;{testimonial.quote}&rdquo;
			</p>

			<div className="relative z-10 flex items-center gap-5 pt-8 border-t border-black/[0.04]">
				<div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-lg font-bold text-white shadow-xl relative overflow-hidden group-hover:rotate-6 transition-transform">
					<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
					{testimonial.avatar}
				</div>

				<div className="flex-1">
					<div className="font-display font-bold text-gray-900 text-base flex items-center gap-2 tracking-tight">
						{testimonial.name}
						<Sparkles size={12} className="text-amber-500" />
					</div>
					<div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
						{testimonial.role}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
