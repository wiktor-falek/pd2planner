import { Router } from "express";
import { buildController } from "../instances.js";
import { validate } from "../middlewares/validate.js";
import { getBuildCode, postCreateBuild } from "../validators.js";
import { createLimiter, readLimiter } from "../middlewares/limiters.js";

export const router = Router();

router.post(
	"/",
	createLimiter,
	validate(postCreateBuild),
	buildController.createBuild.bind(buildController)
);

router.get(
	"/:buildId",
	readLimiter,
	validate(getBuildCode),
	buildController.getBuildCode.bind(buildController)
);
