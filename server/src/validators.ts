import { z } from "zod";

export const postCreateBuild = z.object({
	body: z.object({
		buildCode: z.string() /*.min().max()*/,
	}),
});

export const getBuildCode = z.object({
	params: z.object({
		buildId: z.string().length(12),
	}),
});
