import type { RootDatabase } from "lmdb";
import { Err, Ok } from "resultat";

export class BuildModel {
	constructor(private lmdb: RootDatabase<string, string>) {}

	async addBuild(buildId: string, buildCode: string) {
		try {
			const result = await this.lmdb.put(buildId, buildCode);
			return Ok(result);
		} catch (e) {
			return Err(e);
		}
	}

	async findBuild(buildId: string) {
		try {
			const result = (await this.lmdb.get(buildId)) as string;
			return Ok(result);
		} catch (e) {
			return Err(e);
		}
	}
}
