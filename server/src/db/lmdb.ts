import * as lmdb from "lmdb";

export class LMDB {
	db: lmdb.RootDatabase<string, string> | null = null;

	constructor(private path: string) {}

	connectOrThrow() {
		this.db = lmdb.open({
			path: this.path,
			compression: true,
		});
		return this.db;
	}

	close() {
		this.db?.close();
	}
}
