import { type Result, Ok, Err } from "resultat";
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
		const hash1 = xxhash.h32(buffer, 0x1111).toString(16);
		const hash2 = xxhash.h32(buffer, 0x2222).toString(16);
		const part1 = base62.encode(parseInt(hash1, 16));
		const part2 = base62.encode(parseInt(hash2, 16));
		return part1 + part2;
	}
}
