import type { Metadata } from "next";
import ResumeClient from "@/components/resume/ResumeClient";
import { getPortfolioData } from "@/lib/data";

export function generateMetadata(): Metadata {
	const { personalInfo } = getPortfolioData();
	return {
		title: `${personalInfo.name} Resume — ${personalInfo.title} CV`,
		description: `Download or view the professional resume of ${personalInfo.name}, a ${personalInfo.title} specializing in ${personalInfo.constellationTechs.slice(0, 5).join(", ")}.`,
		alternates: {
			canonical: `${personalInfo.websiteUrl}/resume`,
		},
		openGraph: {
			title: `${personalInfo.name} Resume — ${personalInfo.title}`,
			description: `View the professional resume of ${personalInfo.name}.`,
			url: `${personalInfo.websiteUrl}/resume`,
		},
	};
}

export default function ResumePage() {
	const data = getPortfolioData();
	return <ResumeClient data={data} />;
}
