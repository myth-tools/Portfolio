import type { Metadata } from "next";
import "./globals.css";
import { getPortfolioData } from "@/lib/data";

export function generateMetadata(): Metadata {
	const data = getPortfolioData();
	const { personalInfo } = data;

	return {
		metadataBase: new URL(personalInfo.websiteUrl),
		alternates: {
			canonical: personalInfo.websiteUrl,
		},
		applicationName: `${personalInfo.name} Portfolio`,
		title: {
			default: `${personalInfo.name} — ${personalInfo.title} | ${personalInfo.constellationTechs.slice(0, 4).join(", ")}`,
			template: `%s | ${personalInfo.name} — ${personalInfo.title}`,
		},
		description: personalInfo.seo?.description || personalInfo.tagline,
		keywords: personalInfo.seo?.keywords || [],

		authors: [{ name: personalInfo.name, url: personalInfo.websiteUrl }],
		creator: personalInfo.name,
		openGraph: {
			type: "website",
			locale: "en_US",
			url: personalInfo.websiteUrl,
			title: `${personalInfo.name} — ${personalInfo.title}`,
			description: personalInfo.seo?.description || personalInfo.tagline,
			siteName: `${personalInfo.name} Portfolio`,
			images: [
				{
					url: "/og-image.png",
					width: 1200,
					height: 630,
					alt: `${personalInfo.name} — Full-Stack Web Developer Portfolio`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${personalInfo.name} — ${personalInfo.title}`,
			description: personalInfo.seo?.description || personalInfo.tagline,
			images: ["/og-image.png"],
			creator: "@shesher",
		},
		icons: {
			icon: "/favicon.png",
			apple: "/favicon.png",
		},
	};
}

import Preloader from "@/components/layout/Preloader";
import { PremiumAlertProvider } from "@/components/ui/PremiumAlert";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = getPortfolioData();
	const { personalInfo } = data;

	// JSON-LD structured data for SEO
	const jsonLdPerson = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: personalInfo.name,
		url: personalInfo.websiteUrl,
		jobTitle: personalInfo.title,
		description: personalInfo.tagline,
		sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.whatsapp].filter(Boolean),
		knowsAbout: personalInfo.constellationTechs,
		address: {
			"@type": "PostalAddress",
			addressLocality: personalInfo.location.split(",")[0]?.trim(),
			addressCountry: personalInfo.location.split(",")[1]?.trim() || personalInfo.location,
		},
	};

	const jsonLdWebsite = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: `${personalInfo.name} Portfolio`,
		url: personalInfo.websiteUrl,
		description: personalInfo.seo?.description || personalInfo.tagline,
	};

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structure is safe here
					dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdPerson, jsonLdWebsite]) }}
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="relative">
				{/* Noise texture overlay */}
				<div className="noise-overlay" aria-hidden="true" />
				<Preloader name={personalInfo.name} title={personalInfo.title} />
				<PremiumAlertProvider>{children}</PremiumAlertProvider>
			</body>
		</html>
	);
}
