import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/lib/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	const { personalInfo } = getPortfolioData();
	const baseUrl = personalInfo.websiteUrl.replace(/\/$/, "");

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/api/",
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
