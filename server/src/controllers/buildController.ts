import type { Response } from "express";
import type { ValidatedRequest } from "../types.js";
import type { getBuildCode, postCreateBuild } from "../validators.js";
import type { BuildService } from "../services/buildService.js";
import type { BuildModel } from "../models/buildModel.js";

export class BuildController {
	constructor(private buildService: BuildService, private buildModel: BuildModel) {}

	async createBuild(req: ValidatedRequest<typeof postCreateBuild>, res: Response) {
		const { buildCode } = req.body;
		const result = await this.buildService.createBuild(buildCode);
		if (!result.ok) {
			res.status(500).json({ error: "Internal Server Error" });
			return;
		}

		const { buildId } = result.val;
		res.status(200).json({ buildId });
	}

	getBuildCode(req: ValidatedRequest<typeof getBuildCode>, res: Response) {
		const { buildId } = req.params;
		const result = this.buildModel.findBuild(buildId);

		if (!result.ok) {
			if (result.err === "Not Found") {
				res.status(404).json({ error: "Build not found" });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
			return;
		}

		const { buildCode } = result.val;
		res.status(200).json({ buildCode });
	}
}
