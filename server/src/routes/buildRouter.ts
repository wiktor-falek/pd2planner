import { Router } from "express";
import { buildController } from "../instances.js";

export const router = Router();

router.post("/", buildController.createBuild.bind(buildController));

router.get("/:buildId", buildController.getBuildCode.bind(buildController));
