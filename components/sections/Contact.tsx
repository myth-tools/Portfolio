"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
	AlertCircle,
	ArrowDown,
	CheckCircle,
	Clock,
	type LucideIcon,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	Send,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { PortfolioData } from "@/lib/data";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact({
	personalInfo,
	contactTopics,
}: {
	personalInfo: PortfolioData["personalInfo"];
	contactTopics: PortfolioData["contactTopics"];
}) {
	const [formState, setFormState] = useState<FormState>("idle");
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormState("sending");
		try {
			// Generate metadata similar to the Resend template for a "Premium" feel in the inbox
			const inquiryId = `INQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
			const timestamp = new Date().toLocaleString();

			const res = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...form,
					_subject: `📬 [Technical Inquiry] ${form.subject}`,
					"Inquiry ID": inquiryId,
					"Submission Timestamp": timestamp,
					Source: "Portfolio System (Secure Transmission)",
				}),
			});
			if (res.ok) {
				setFormState("success");
				setForm({ name: "", email: "", subject: "", message: "" });
			} else {
				setFormState("error");
			}
		} catch {
			setFormState("error");
		}
		setTimeout(() => setFormState("idle"), 5000);
	};

	const contactItems = [
		{
			icon: Mail,
			label: "Email",
			value: personalInfo.email,
			href: `mailto:${personalInfo.email}`,
			color: "#8b5cf6",
			size: "large",
		},
		{
			icon: Phone,
			label: "Phone",
			value: personalInfo.phone,
			href: `tel:${personalInfo.phone}`,
			color: "#0ea5e9",
			size: "small",
		},
		{
			icon: MapPin,
			label: "Location",
			value: personalInfo.location,
			href: null,
			color: "#10b981",
			size: "small",
		},
		{
			icon: Clock,
			label: "Availability",
			value: personalInfo.availability,
			href: null,
			color: "#f59e0b",
			size: "small",
		},
	];

	return (
		<section
			id="contact"
			className="section-padding relative overflow-hidden bg-[#fafafa]/40 contain-paint will-change-opacity will-change-transform"
		>
			{/* Ambient background glows */}
			<div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-violet-50/20 blur-[140px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-50/20 blur-[120px] rounded-full pointer-events-none" />

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
							Get in Touch
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6"
						>
							Let&apos;s Build the{" "}
							<span className="font-serif italic font-normal text-gray-400">Future</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed font-light"
						>
							Whether you have a groundbreaking idea or just want to discuss engineering philosophy
							— my inbox is open.
						</motion.p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* Left: Info Bento Grid */}
						<div className="lg:col-span-5 grid grid-cols-2 gap-4">
							{contactItems.map((item, index) => (
								<ContactTile key={item.label} item={item} index={index} />
							))}

							{/* Socials Card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4 }}
								className="col-span-2 p-8 rounded-[2rem] bg-white border border-black/[0.05] shadow-xl relative overflow-hidden group"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] to-transparent pointer-events-none" />
								<p className="relative z-10 font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
									<Sparkles size={16} className="text-amber-500" />
									Digital Presence
								</p>
								<div className="relative z-10 flex gap-4">
									{[
										{ icon: FaGithub, href: personalInfo.github, label: "GitHub" },
										{ icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
										{ icon: FaWhatsapp, href: personalInfo.whatsapp, label: "WhatsApp" },
									].map((soc) => (
										<a
											key={soc.label}
											href={soc.href}
											target="_blank"
											rel="noopener noreferrer"
											className="w-14 h-14 rounded-2xl bg-gray-50 border border-black/[0.04] flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-black/[0.1] hover:shadow-lg transition-all group/soc"
										>
											<soc.icon
												size={20}
												className="group-hover/soc:scale-110 transition-transform"
											/>
										</a>
									))}
								</div>
							</motion.div>
						</div>

						{/* Right: Premium Form */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="lg:col-span-7"
						>
							<FormCard
								form={form}
								formState={formState}
								contactTopics={contactTopics}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
							/>
						</motion.div>
					</div>
				</div>
			</SectionReveal>
		</section>
	);
}

interface ContactItem {
	icon: LucideIcon;
	label: string;
	value: string;
	href: string | null;
	color: string;
	size: string;
}

function ContactTile({ item, index }: { item: ContactItem; index: number }) {
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
		x.set(mouseX / width - 0.5);
		y.set(mouseY / height - 0.5);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			viewport={{ once: true }}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => {
				x.set(0);
				y.set(0);
			}}
			style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			className={`group relative p-8 rounded-[2rem] bg-white border border-black/[0.04] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu ${
				item.size === "large" ? "col-span-2" : "col-span-1"
			}`}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none" />
			<div
				className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700"
				style={{ backgroundColor: item.color }}
			/>

			<div className="relative z-10 flex flex-col gap-4" style={{ transform: "translateZ(30px)" }}>
				<div
					className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-black/[0.02]"
					style={{ backgroundColor: `${item.color}10` }}
				>
					<item.icon size={20} style={{ color: item.color }} />
				</div>
				<div>
					<p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
						{item.label}
					</p>
					{item.href ? (
						<a
							href={item.href}
							className="text-gray-900 font-bold hover:text-amber-600 transition-colors break-words"
						>
							{item.value}
						</a>
					) : (
						<p className="text-gray-900 font-bold break-words">{item.value}</p>
					)}
				</div>
			</div>
		</motion.div>
	);
}

interface FormCardProps {
	form: {
		name: string;
		email: string;
		subject: string;
		message: string;
	};
	formState: FormState;
	contactTopics: string[];
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => void;
	handleSubmit: (e: React.FormEvent) => Promise<void>;
}
function FormCard({ form, formState, contactTopics, handleChange, handleSubmit }: FormCardProps) {
	return (
		<div className="glass-card p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border-white/50 transform-gpu">
			{/* Architectural Grid Overlay */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

			{/* Ambient background glows */}
			<div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-400/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
			<div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

			<div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-14 sm:mb-24 relative z-10">
				{/* Ultra-Premium Glass Icon Hub */}
				<div className="relative group/icon">
					<div className="absolute inset-[-12px] bg-gradient-to-tr from-amber-400/20 via-transparent to-blue-400/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-1000" />
					<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2.2rem] bg-white border border-black/[0.06] shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center justify-center relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-60" />
						<MessageSquare
							size={32}
							className="sm:size-[40px] text-gray-900 relative z-10 group-hover/icon:scale-110 transition-transform duration-700"
						/>
						{/* Inner Glow Ring */}
						<div className="absolute inset-1.5 border border-black/[0.03] rounded-[1.8rem] pointer-events-none" />
					</div>
				</div>

				<div className="flex flex-col">
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="inline-flex items-center gap-3 mb-4"
					>
						<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
						<p className="text-[10px] sm:text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em]">
							Active &bull; Response <span className="font-bold text-gray-950">&lt; 24h</span>
						</p>
					</motion.div>
					<h3 className="font-display font-bold text-4xl sm:text-6xl text-gray-900 tracking-tight leading-none">
						Direct <span className="font-serif italic font-normal text-gray-400">Message</span>
					</h3>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6 sm:gap-8">
				{/* Identity Row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
					<FloatingInput
						label="Full Name"
						name="name"
						value={form.name}
						onChange={handleChange}
						required
					/>
					<FloatingInput
						label="Email Address"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
				</div>

				{/* Selection Hub */}
				<PremiumSelect
					label="Choose a topic"
					name="subject"
					value={form.subject}
					options={contactTopics}
					onChange={(val) =>
						handleChange({
							target: { name: "subject", value: val },
						} as React.ChangeEvent<HTMLSelectElement>)
					}
				/>

				{/* Message Hub */}
				<FloatingInput
					label="Describe your vision or inquiry..."
					name="message"
					value={form.message}
					onChange={handleChange}
					isTextArea
					required
				/>

				{/* Status messages */}
				<AnimatePresence mode="wait">
					{formState === "success" && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.95 }}
							className="flex items-center gap-6 p-7 rounded-[2rem] bg-emerald-50/60 backdrop-blur-2xl border border-emerald-100 text-emerald-800 text-sm font-bold shadow-2xl shadow-emerald-500/5"
						>
							<div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 shrink-0">
								<CheckCircle size={26} />
							</div>
							<div>
								<p className="mb-0.5 text-lg">Transmission Secured</p>
								<p className="text-[11px] font-normal opacity-70 uppercase tracking-[0.1em]">
									Expect a response within 24 hours.
								</p>
							</div>
						</motion.div>
					)}
					{formState === "error" && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.95 }}
							className="flex items-center gap-6 p-7 rounded-[2rem] bg-red-50/60 backdrop-blur-2xl border border-red-100 text-red-700 text-sm font-bold shadow-2xl shadow-red-500/5"
						>
							<div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30 shrink-0">
								<AlertCircle size={26} />
							</div>
							<div>
								<p className="mb-0.5 text-lg">System Malfunction</p>
								<p className="text-[11px] font-normal opacity-70 uppercase tracking-[0.1em]">
									Please attempt direct email transmission.
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<motion.button
					type="submit"
					disabled={formState === "sending"}
					whileHover={{ scale: 1.015 }}
					whileTap={{ scale: 0.985 }}
					className="btn-primary w-full py-7 sm:py-9 text-base sm:text-lg uppercase tracking-[0.4em] font-black disabled:opacity-50 group/btn shadow-[0_24px_60px_rgba(0,0,0,0.18)] relative overflow-hidden bg-gray-950 rounded-[1.8rem]"
				>
					<div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
					{formState === "sending" ? (
						<span className="flex items-center justify-center gap-5 relative z-10">
							<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							Transmitting...
						</span>
					) : (
						<span className="flex items-center justify-center gap-5 relative z-10">
							<Send
								size={24}
								className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform duration-700"
							/>
							Send Transmission
						</span>
					)}
				</motion.button>
			</form>
		</div>
	);
}

function FloatingInput({
	label,
	name,
	value,
	onChange,
	type = "text",
	isTextArea = false,
	required = false,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	type?: string;
	isTextArea?: boolean;
	required?: boolean;
}) {
	const [focused, setFocused] = useState(false);
	const hasValue = value.length > 0;

	return (
		<div className="relative w-full">
			<div
				className={`group relative rounded-[1.2rem] bg-black/[0.02] border transition-all duration-700 overflow-hidden ${
					focused
						? "border-amber-400/40 bg-white shadow-[0_20px_40px_rgba(251,191,36,0.08)]"
						: "border-black/[0.08]"
				}`}
			>
				<label
					htmlFor={name}
					className={`absolute left-6 transition-all duration-700 pointer-events-none uppercase tracking-[0.25em] font-black ${
						focused || hasValue
							? "top-3 text-[8px] text-amber-500 opacity-100"
							: "top-5 text-[11px] text-gray-400 opacity-40"
					}`}
				>
					{label}
				</label>
				{isTextArea ? (
					<textarea
						id={name}
						name={name}
						value={value}
						onChange={onChange}
						required={required}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						rows={5}
						className="w-full bg-transparent pt-10 pb-4 px-6 focus:outline-none text-gray-950 font-bold text-base sm:text-lg resize-none leading-relaxed"
					/>
				) : (
					<input
						id={name}
						type={type}
						name={name}
						value={value}
						onChange={onChange}
						required={required}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						className="w-full bg-transparent pt-10 pb-4 px-6 focus:outline-none text-gray-950 font-bold text-base sm:text-lg h-20 sm:h-24"
					/>
				)}
			</div>
		</div>
	);
}

function PremiumSelect({
	label,
	name,
	options,
	value,
	onChange,
}: {
	label: string;
	name: string;
	options: string[];
	value: string;
	onChange: (val: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative w-full">
			<div
				className={`group relative rounded-[1.2rem] bg-black/[0.02] border transition-all duration-700 ${
					isOpen
						? "border-amber-400/40 bg-white shadow-[0_20px_40px_rgba(251,191,36,0.08)]"
						: "border-black/[0.08]"
				}`}
			>
				<label
					htmlFor={name}
					className={`absolute left-6 transition-all duration-700 pointer-events-none uppercase tracking-[0.25em] font-black ${
						isOpen || value
							? "top-3 text-[8px] text-amber-500 opacity-100"
							: "top-5 text-[11px] text-gray-400 opacity-40"
					}`}
				>
					{label}
				</label>
				<button
					id={name}
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="w-full bg-transparent pt-10 pb-4 px-6 flex justify-between items-center cursor-pointer focus:outline-none transition-all h-20 sm:h-24"
				>
					<span
						className={`text-base sm:text-lg font-bold ${value ? "text-gray-950" : "text-gray-300"}`}
					>
						{value || "Select Category..."}
					</span>
					<ArrowDown
						size={18}
						className={`text-gray-400 transition-transform duration-700 ${isOpen ? "rotate-180" : ""}`}
					/>
				</button>

				<AnimatePresence>
					{isOpen && (
						<>
							<button
								type="button"
								aria-label="Close dropdown"
								className="fixed inset-0 z-40 cursor-default"
								onClick={() => setIsOpen(false)}
							/>
							<motion.div
								initial={{ opacity: 0, y: 12, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 8, scale: 0.98 }}
								className="absolute left-0 right-0 top-full mt-4 bg-white border border-black/[0.08] rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-3 z-50 backdrop-blur-3xl"
							>
								<div className="space-y-1">
									{options.map((opt) => (
										<button
											key={opt}
											type="button"
											onClick={() => {
												onChange(opt);
												setIsOpen(false);
											}}
											className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold transition-all ${
												value === opt
													? "bg-gray-950 text-white shadow-xl shadow-black/10"
													: "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
											}`}
										>
											{opt}
										</button>
									))}
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
