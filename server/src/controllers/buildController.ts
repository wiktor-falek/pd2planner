import type { Response } from "express";
import type { ValidatedRequest } from "../types.js";
import type { getBuildCode, postCreateBuild } from "../validators.js";
import type { BuildService } from "../services/buildService.js";

export class BuildController {
	constructor(private buildService: BuildService) {}

	createBuild(req: ValidatedRequest<typeof postCreateBuild>, res: Response) {
		const { buildCode } = req.body;

		this.buildService.createBuild(buildCode);
		/*
        hash the buildCode and slice
        save to database (409 if already exist)
        */
	}

	getBuildCode(req: ValidatedRequest<typeof getBuildCode>, res: Response) {
		const { buildId } = req.params;
	}
}
