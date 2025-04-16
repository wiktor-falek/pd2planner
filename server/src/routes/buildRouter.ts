import { Router } from "express";
import { buildController } from "../instances.js";
import { validate } from "../middlewares/validate.js";
import { getBuildCode, postCreateBuild } from "../validators.js";

export const router = Router();

router.post("/", validate(postCreateBuild), buildController.createBuild.bind(buildController));

router.get("/:buildId", validate(getBuildCode), buildController.getBuildCode.bind(buildController));
