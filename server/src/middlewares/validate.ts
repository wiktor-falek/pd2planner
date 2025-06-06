import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

/**
 * Ensures that the request body/params/query match the passed schema.
 *
 * On invalid request schema breaks the middleware chain returning 422.
 */
export function validate(schema: ZodSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.safeParse(req);

		if (!validation.success) {
			res.status(422).json({ error: validation.error.issues });
			return;
		}

		return next();
	};
}
