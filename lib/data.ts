import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { type PortfolioData, PortfolioDataSchema } from "./schema";

/**
 * Loads and validates the portfolio data from the YAML file.
 * This is a server-side only operation.
 */
export function getPortfolioData(): PortfolioData {
	try {
		const filePath = path.join(process.cwd(), "content/portfolio.yml");
		const fileContents = fs.readFileSync(filePath, "utf8");
		const rawData = yaml.load(fileContents);

		// Validate the data against our schema
		return PortfolioDataSchema.parse(rawData);
	} catch (error) {
		console.error("Error loading portfolio data:", error);
		throw new Error("Failed to load portfolio data. Please check content/portfolio.yml");
	}
}

// Re-export types for use in components
export type {
	Experience,
	PortfolioData,
	Project,
	Skill,
	SkillCategory,
} from "./schema";
