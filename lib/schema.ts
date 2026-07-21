import { z } from "zod";

export const PersonalInfoSchema = z.object({
	name: z.string(),
	title: z.string(),
	tagline: z.string(),
	bio: z.string(),
	bioExtended: z.string(),
	executiveSummary: z.string(),
	email: z.string().email(),
	phone: z.string(),
	location: z.string(),
	availability: z.string(),
	resumeUrl: z.string(),
	github: z.string().url(),
	websiteUrl: z.string().url(),
	repoUrl: z.string().url(),
	formspreeId: z.string(),
	linkedin: z.string().url().or(z.literal("")),
	whatsapp: z.string().url().or(z.literal("")),
	heroRoles: z.array(z.string()),
	constellationTechs: z.array(z.string()),
	profilePhoto: z.string().optional(),
	showProfilePhoto: z.boolean().default(false),
	developerStatus: z.string().optional(),
	developerFocus: z.string().optional(),
	seo: z
		.object({
			description: z.string(),
			keywords: z.array(z.string()),
		})
		.optional(),
});

export const EducationSchema = z.object({
	degree: z.string(),
	school: z.string(),
	location: z.string(),
	duration: z.string(),
	gpa: z.string().optional(),
	honors: z.string().optional(),
});

export const NavigationLinkSchema = z.object({
	label: z.string(),
	href: z.string(),
});

export const StatSchema = z.object({
	number: z.string(),
	label: z.string(),
});

export const SkillSchema = z.object({
	name: z.string(),
	icon: z.string(),
	level: z.number().min(0).max(100),
});

export const SkillCategorySchema = z.object({
	category: z.string(),
	color: z.string(),
	skills: z.array(SkillSchema),
});

export const ExperienceSchema = z.object({
	id: z.number(),
	role: z.string(),
	company: z.string(),
	location: z.string(),
	duration: z.string(),
	type: z.enum(["Full-time", "Part-time", "Freelance", "Contract"]),
	description: z.array(z.string()),
	stack: z.array(z.string()),
});

export const ProjectSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	longDescription: z.string(),
	category: z.string(),
	tags: z.array(z.string()),
	github: z.string(),
	live: z.string(),
	featured: z.boolean(),
	gradient: z.string(),
	icon: z.string(),
	image: z.string().optional(),
	showImage: z.boolean().default(true),
	githubPrivate: z.boolean().optional(),
	livePrivate: z.boolean().optional(),
});

export const TestimonialSchema = z.object({
	id: z.number(),
	name: z.string(),
	role: z.string(),
	avatar: z.string(),
	avatarColor: z.string(),
	quote: z.string(),
});

export const EngineeringPhilosophySchema = z.object({
	quote: z.string(),
	principles: z.array(z.string()),
});

export const CertificationSchema = z.object({
	name: z.string(),
	issuer: z.string(),
	date: z.string(),
	id: z.string().optional(),
	link: z.string().url().optional(),
});

export const LanguageSchema = z.object({
	name: z.string(),
	level: z.string(),
});

export const VolunteerSchema = z.object({
	role: z.string(),
	org: z.string(),
	description: z.string(),
});

export const ResumeMetaSchema = z.object({
	labels: z.object({
		connectivity: z.string(),
		techArsenal: z.string(),
		credentials: z.string(),
		languages: z.string(),
		executiveStrategy: z.string(),
		professionalMilestones: z.string(),
		education: z.string(),
		engineeringCore: z.string(),
		contributionEcosystem: z.string(),
	}),
	status: z.object({
		label: z.string(),
		release: z.string(),
	}),
	footer: z.string(),
});

export type Skill = z.infer<typeof SkillSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type EngineeringPhilosophy = z.infer<typeof EngineeringPhilosophySchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type NavigationLink = z.infer<typeof NavigationLinkSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Volunteer = z.infer<typeof VolunteerSchema>;
export type ResumeMeta = z.infer<typeof ResumeMetaSchema>;

export const PortfolioDataSchema = z.object({
	personalInfo: PersonalInfoSchema,
	navigation: z.array(NavigationLinkSchema),
	stats: z.array(StatSchema),
	skillCategories: z.array(SkillCategorySchema),
	experiences: z.array(ExperienceSchema),
	projects: z.array(ProjectSchema),
	testimonials: z.array(TestimonialSchema),
	engineeringPhilosophy: EngineeringPhilosophySchema,
	certifications: z.array(CertificationSchema),
	education: z.array(EducationSchema),
	contactTopics: z.array(z.string()),
	extraSkills: z.array(z.string()),
	languages: z.array(LanguageSchema).optional(),
	volunteer: z.array(VolunteerSchema).optional(),
	resumeMeta: ResumeMetaSchema.optional(),
});

export type PortfolioData = z.infer<typeof PortfolioDataSchema>;
