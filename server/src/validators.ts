import { z } from "zod";

export const postCreateBuild = z.object({
	body: z.object({
		buildCode: z.string(), // TODO: base64 regex + custom build validation
	}),
});

export const getBuildCode = z.object({
	params: z.object({
		buildId: z
			.string()
			.length(12)
			.regex(/^[a-zA-Z0-9]+$/),
	}),
});
