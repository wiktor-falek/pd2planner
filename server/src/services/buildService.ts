import { type Result, Ok, Err } from "resultat";
import xxhash from "xxhashjs";
import base62 from "base62";

export class BuildService {
	constructor() {}

	async createBuild(buildCode: string): Promise<Result<{ buildId: string }, unknown>> {
		const buildId = this.generateBuildId(buildCode);
		
		return Promise.resolve(Err({}));
	}

	private generateBuildId(buildCode: string) {
		const buffer = Buffer.from(buildCode);
		const hashHex = xxhash.h32(buffer, 0x1234).toString(16);
		const hashNumber = parseInt(hashHex, 16);
		const baseEncoded = base62.encode(hashNumber);
		return baseEncoded.substring(0, 12);
	}
}
