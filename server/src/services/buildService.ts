import { Ok } from "resultat";
import xxhash from "xxhashjs";
import base62 from "base62";
import type { BuildModel } from "../models/buildModel.js";

export class BuildService {
	constructor(private buildModel: BuildModel) {}

	async createBuild(buildCode: string) {
		const buildId = this.generateBuildId(buildCode);
		const result = await this.buildModel.addBuild(buildId, buildCode);
		return result.ok ? Ok({ buildId }) : result;
	}

	private generateBuildId(buildCode: string) {
		const buffer = Buffer.from(buildCode);
		const hash = xxhash.h64(buffer, 0x1111).toString(16);
		const buildId = base62.encode(parseInt(hash, 16)).padEnd(12, "0");
		return buildId;
	}
}
