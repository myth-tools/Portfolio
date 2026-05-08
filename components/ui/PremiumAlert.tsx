"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";

type AlertType = "github" | "live" | "confidential" | "maintenance";

interface AlertContextType {
	triggerAlert: (type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function PremiumAlertProvider({ children }: { children: React.ReactNode }) {
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState<AlertType>("confidential");

	const triggerAlert = useCallback((newType: AlertType = "confidential") => {
		setType(newType);
		setVisible(true);
		setTimeout(() => setVisible(false), 5000);
	}, []);

	const getAlertConfig = (t: AlertType) => {
		switch (t) {
			case "github":
				return {
					title: "Confidentiality Protocol",
					message:
						"This repository is currently under a proprietary protection protocol or NDA. Technical details available via consultation.",
				};
			case "live":
				return {
					title: "Access Restricted",
					message:
						"This deployment is restricted to authorized personnel or protected by non-disclosure agreements.",
				};
			case "maintenance":
				return {
					title: "System Maintenance",
					message:
						"Infrastructure upgrade in progress. Access to this module will be restored shortly.",
				};
			default:
				return {
					title: "Proprietary Architecture",
					message:
						"This system architecture is protected by intellectual property standards and legal non-disclosure requirements.",
				};
		}
	};

	const config = getAlertConfig(type);

	return (
		<AlertContext.Provider value={{ triggerAlert }}>
			{children}

			<AnimatePresence>
				{visible && (
					<motion.div
						initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
						animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
						exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
						className="fixed bottom-12 left-1/2 z-[9999] w-[90%] max-w-md p-6 rounded-3xl bg-gray-950/90 backdrop-blur-3xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex items-center gap-5 text-white"
					>
						<div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
							<Lock size={22} className="text-amber-500" />
						</div>
						<div className="flex-1">
							<h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-1">
								{config.title}
							</h4>
							<p className="text-[11px] font-medium text-gray-400 leading-relaxed">
								{config.message}
							</p>
						</div>
						<button
							type="button"
							onClick={() => setVisible(false)}
							className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
						>
							<X size={16} />
						</button>

						{/* Progress Bar */}
						<motion.div
							initial={{ width: "100%" }}
							animate={{ width: "0%" }}
							transition={{ duration: 5, ease: "linear" }}
							className="absolute bottom-0 left-0 h-1 bg-amber-500/30 rounded-full"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</AlertContext.Provider>
	);
}

export function usePremiumAlert() {
	const context = useContext(AlertContext);
	if (context === undefined) {
		throw new Error("usePremiumAlert must be used within a PremiumAlertProvider");
	}
	return context;
}
