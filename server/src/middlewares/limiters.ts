import rateLimit from "express-rate-limit";

export const createLimiter = rateLimit({
	windowMs: 1000 * 60 * 15,
	limit: 15,
	standardHeaders: true,
	legacyHeaders: false,
});
export const readLimiter = rateLimit({
	windowMs: 1000 * 60 * 15,
	limit: 60,
	standardHeaders: true,
	legacyHeaders: false,
});
