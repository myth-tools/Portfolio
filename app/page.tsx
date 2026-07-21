import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import { getPortfolioData } from "@/lib/data";

export default function Home() {
	const data = getPortfolioData();

	// Deep Indexing: Project ItemList Schema
	const projectItemListSchema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: data.projects.map((project, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "SoftwareSourceCode",
				name: project.title,
				description: project.description,
				programmingLanguage: project.tags.join(", "),
				url: project.live || project.github || data.personalInfo.websiteUrl,
				author: {
					"@type": "Person",
					name: data.personalInfo.name,
				},
			},
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structure is safe here
				dangerouslySetInnerHTML={{ __html: JSON.stringify(projectItemListSchema) }}
			/>
			<Navbar personalInfo={data.personalInfo} navigation={data.navigation} />
			<main>
				<Hero personalInfo={data.personalInfo} stats={data.stats} />
				<About
					personalInfo={data.personalInfo}
					engineeringPhilosophy={data.engineeringPhilosophy}
					certifications={data.certifications}
				/>
				<Skills skillCategories={data.skillCategories} extraSkills={data.extraSkills} />
				<Experience experiences={data.experiences} />
				<Projects projects={data.projects} personalInfo={data.personalInfo} />
				<Testimonials testimonials={data.testimonials} />
				<Contact personalInfo={data.personalInfo} contactTopics={data.contactTopics} />
			</main>
			<Footer personalInfo={data.personalInfo} navigation={data.navigation} />
		</>
	);
}
