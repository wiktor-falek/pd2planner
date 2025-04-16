import type { RootDatabase } from "lmdb";
import { Err, Ok } from "resultat";

export class BuildModel {
	constructor(private lmdb: RootDatabase<string, string>) {}

	async addBuild(buildId: string, buildCode: string) {
		try {
			const exists = this.lmdb.doesExist(buildId);
			if (exists) return Err("Already exists" as const);

			const result = await this.lmdb.put(buildId, buildCode);
			return Ok(result);
		} catch (e) {
			console.error(e);
			return Err("Database write fail" as const);
		}
	}

	findBuild(buildId: string) {
		try {
			const result = this.lmdb.get(buildId);
			if (result === undefined) return Err("Not Found" as const);
			return Ok({ buildCode: result });
		} catch (e) {
			console.error(e);
			return Err("Database read fail" as const);
		}
	}
}
