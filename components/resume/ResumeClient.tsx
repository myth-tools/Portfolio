"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioData } from "@/lib/schema";

export default function ResumeClient({ data }: { data: PortfolioData }) {
	const {
		personalInfo,
		experiences,
		certifications,
		education,
		skillCategories,
		engineeringPhilosophy,
		languages = [],
		volunteer = [],
		resumeMeta = {
			labels: {
				connectivity: "Connectivity",
				techArsenal: "Tech Arsenal",
				credentials: "Credentials",
				languages: "Languages",
				executiveStrategy: "Executive Strategy",
				professionalMilestones: "Professional Milestones",
				education: "Education",
				engineeringCore: "Engineering Core",
				contributionEcosystem: "Contribution Ecosystem",
			},
			status: {
				label: "Standardized",
				release: "Release 2026",
			},
			footer: "Validated Senior Engineering Standards • 2026",
		},
	} = data;

	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="min-h-screen bg-[#fafaf8] flex flex-col items-center p-4 md:p-12 lg:p-16">
			{/* Premium Viewer UI (Hidden on Print) */}
			<div className="fixed inset-0 bg-[#fafaf8] z-[-1] no-print" />
			<div className="fixed inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 z-[-1] no-print" />

			{/* Floating Navbar (Hidden on Print) */}
			<nav className="no-print fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 p-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-black/5 shadow-2xl">
				<Link
					href="/"
					className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-black hover:bg-black/5 transition-all text-xs font-bold tracking-widest uppercase"
				>
					<ArrowLeft size={14} strokeWidth={3} />
					Portfolio
				</Link>
				<div className="h-4 w-[1px] bg-black/10 mx-2" />
				<button
					type="button"
					onClick={handlePrint}
					className="flex items-center gap-3 px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white hover:bg-black transition-all text-xs font-black tracking-[0.15em] uppercase shadow-xl shadow-black/10"
				>
					<Download size={16} strokeWidth={3} />
					Download PDF
				</button>
			</nav>

			{/* Document Wrapper */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-5xl w-full bg-white shadow-[0_80px_160px_rgba(0,0,0,0.08)] rounded-[3rem] min-h-[1100px] flex flex-col md:flex-row print:shadow-none print:rounded-none relative border border-black/5 overflow-hidden"
			>
				{/* Sidebar */}
				<aside className="w-full md:w-[360px] bg-[#0a0a0a] text-white p-14 flex flex-col gap-14 print:bg-[#0a0a0a] print:text-white shrink-0">
					<div>
						{personalInfo.showProfilePhoto && personalInfo.profilePhoto ? (
							<div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative group transform-gpu hover:rotate-3 transition-transform duration-700 print:transform-none">
								<Image
									src={personalInfo.profilePhoto}
									alt={`${personalInfo.name} - ${personalInfo.title} Professional Profile Photo`}
									fill
									priority
									unoptimized
									className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
									sizes="128px"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent pointer-events-none" />
							</div>
						) : (
							<div className="w-16 h-16 bg-[#c9a84c] rounded-[1.25rem] flex items-center justify-center text-4xl font-bold text-gray-950 mb-12 shadow-[0_20px_40px_rgba(201,168,76,0.2)]">
								{personalInfo.name.charAt(0)}
							</div>
						)}
						<h1 className="text-4xl font-bold tracking-tight mb-4 leading-none font-display uppercase">
							{personalInfo.name.split(" ")[0]}
							<span className="text-[#c9a84c]">.</span>
						</h1>
						<p className="text-[#c9a84c] font-bold text-[10px] uppercase tracking-[0.4em] leading-relaxed">
							{personalInfo.title.split(" & ").join("<br/>")}
						</p>
					</div>

					{/* Connectivity */}
					<div className="space-y-6">
						<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-700 flex items-center gap-4 after:h-[1px] after:flex-1 after:bg-gray-800">
							{resumeMeta.labels.connectivity}
						</div>
						<div className="space-y-4 text-xs font-medium text-gray-400">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
								<span>{personalInfo.email}</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-white/20" />
								<span>{personalInfo.location}</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-white/20" />
								<span>{personalInfo.github.replace("https://", "")}</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-white/20" />
								<span>{personalInfo.linkedin.replace("https://", "")}</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-white/20" />
								<span>{personalInfo.whatsapp.replace("https://", "")}</span>
							</div>
						</div>
					</div>

					{/* Tech Arsenal */}
					<div className="space-y-10">
						<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-700 flex items-center gap-4 after:h-[1px] after:flex-1 after:bg-gray-800">
							{resumeMeta.labels.techArsenal}
						</div>
						<div className="space-y-8">
							{skillCategories.slice(0, 2).map((cat) => (
								<div key={cat.category}>
									<h4 className="text-[9px] font-bold text-[#c9a84c] uppercase tracking-[0.4em] mb-4">
										{cat.category}
									</h4>
									<div className="flex flex-wrap gap-2">
										{cat.skills.slice(0, 6).map((skill) => (
											<span
												key={skill.name}
												className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-bold text-gray-200 uppercase tracking-widest"
											>
												{skill.name}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Verified Credentials */}
					<div className="space-y-8">
						<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-700 flex items-center gap-4 after:h-[1px] after:flex-1 after:bg-gray-800">
							{resumeMeta.labels.credentials}
						</div>
						<div className="space-y-4">
							{certifications.slice(0, 3).map((cert) => (
								<div key={cert.name} className="p-4 rounded-2xl bg-white/5 border border-white/5">
									<div className="text-[10px] font-bold text-white mb-1">{cert.name}</div>
									<div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest leading-none">
										{cert.issuer} &bull; {cert.date}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Status Badge */}
					<div className="flex flex-col gap-8 mt-auto">
						{languages.length > 0 && (
							<div className="space-y-6">
								<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-700 flex items-center gap-4 after:h-[1px] after:flex-1 after:bg-gray-800">
									{resumeMeta.labels.languages}
								</div>
								<div className="space-y-4">
									{languages.map((lang) => (
										<div
											key={lang.name}
											className="flex flex-col gap-1.5 text-[10px] font-bold uppercase tracking-widest"
										>
											<span className="text-white">{lang.name}</span>
											<span className="text-gray-600 text-[8px] font-black">{lang.level}</span>
										</div>
									))}
								</div>
							</div>
						)}

						<div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
							<div className="w-8 h-8 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c]">
								<Shield size={16} strokeWidth={3} />
							</div>
							<div>
								<div className="text-[9px] font-black text-white uppercase tracking-widest leading-none mb-1">
									{resumeMeta.status.label}
								</div>
								<div className="text-[8px] text-gray-600 uppercase tracking-widest font-bold">
									{resumeMeta.status.release}
								</div>
							</div>
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-16 md:p-20 flex flex-col gap-16 bg-white">
					{/* Executive Summary */}
					<section>
						<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-300 flex items-center gap-4 mb-8 after:h-[1px] after:flex-1 after:bg-gray-100">
							{resumeMeta.labels.executiveStrategy}
						</div>
						<p className="text-gray-500 text-xl leading-relaxed font-light italic">
							{personalInfo.executiveSummary}
						</p>
					</section>

					{/* Professional Milestones */}
					<section>
						<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-300 flex items-center gap-4 mb-12 after:h-[1px] after:flex-1 after:bg-gray-100">
							{resumeMeta.labels.professionalMilestones}
						</div>
						<div className="space-y-12">
							{experiences.map((exp) => (
								<div key={exp.id} className="relative pl-12 border-l-2 border-gray-50">
									<div className="absolute w-5 h-5 bg-[#c9a84c] rounded-full -left-[11px] top-1 border-4 border-white shadow-lg shadow-[#c9a84c]/20" />
									<div className="mb-6">
										<h3 className="text-2xl font-bold text-gray-900 tracking-tight">{exp.role}</h3>
										<p className="text-[#c9a84c] font-bold text-[9px] uppercase tracking-[0.3em] mt-2">
											{exp.company} &bull; {exp.duration}
										</p>
									</div>
									<ul className="space-y-3">
										{exp.description.slice(0, 3).map((desc) => (
											<li
												key={desc}
												className="flex gap-4 text-sm text-gray-500 font-light leading-relaxed"
											>
												<div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2 shrink-0" />
												<span>{desc}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>

					{/* Education & Core */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-auto pt-12 border-t border-gray-100">
						<section>
							<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-300 flex items-center gap-4 mb-8 after:h-[1px] after:flex-1 after:bg-gray-100">
								{resumeMeta.labels.education}
							</div>
							{education.map((edu) => (
								<div key={edu.degree}>
									<h4 className="text-lg font-bold text-gray-900 leading-tight">{edu.degree}</h4>
									<p className="text-[#c9a84c] font-bold text-[8px] uppercase tracking-[0.3em] mt-2">
										{edu.school} &bull; {edu.duration}
									</p>
									<div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
										{edu.gpa && (
											<>
												<span>GPA: {edu.gpa}</span>
												{edu.honors && <span className="text-gray-200">&bull;</span>}
											</>
										)}
										{edu.honors && <span>{edu.honors}</span>}
									</div>
								</div>
							))}
						</section>
						<section>
							<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-300 flex items-center gap-4 mb-8 after:h-[1px] after:flex-1 after:bg-gray-100">
								{resumeMeta.labels.engineeringCore}
							</div>
							<div className="flex flex-wrap gap-4">
								{engineeringPhilosophy.principles.map((p) => (
									<span
										key={p}
										className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg border border-black/[0.03]"
									>
										{p}
									</span>
								))}
							</div>
						</section>
					</div>

					{/* Open Source & Volunteer */}
					{volunteer.length > 0 && (
						<section>
							<div className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-300 flex items-center gap-4 mb-10 after:h-[1px] after:flex-1 after:bg-gray-100">
								{resumeMeta.labels.contributionEcosystem}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{volunteer.map((v) => (
									<div
										key={v.org}
										className="p-6 rounded-2xl bg-gray-50/50 border border-black/[0.03]"
									>
										<div className="flex justify-between items-start mb-2">
											<h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
												{v.role}
											</h4>
											<span className="text-[8px] font-black text-[#c9a84c] uppercase tracking-[0.3em]">
												{v.org}
											</span>
										</div>
										<p className="text-xs text-gray-500 font-light leading-relaxed italic">
											{v.description}
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Page Footer (Hidden on Print) */}
					<div className="no-print text-center pt-8 opacity-40">
						<p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.5em]">
							{resumeMeta?.footer ?? "Validated Senior Engineering Standards • 2026"}
						</p>
					</div>
				</main>
			</motion.div>

			<style jsx global>{`
				@media print {
					.no-print { display: none !important; }
					body { background: white !important; padding: 0 !important; margin: 0 !important; }
					@page { margin: 0; size: A4; }
					.container-custom { width: 100% !important; max-width: none !important; }
				}
				.font-display { font-family: 'Syne', sans-serif; }
			`}</style>
		</div>
	);
}
