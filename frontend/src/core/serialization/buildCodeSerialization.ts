import { type BuildData } from "../build/buildData";
import { gzip, ungzip } from "pako";

export function serializeBuildDataToBuildCode(buildData: BuildData): string {
	const json = JSON.stringify(buildData);
	
	const compressed = gzip(json);

	let hexString = "";
	for (let i = 0; i < compressed.length; i++) {
		const charCode = compressed[i]!;
		hexString += charCode.toString(16).padStart(2, "0");
	}

	const buildCode = btoa(hexString);
	return buildCode;
}

export function deserializeBuildCodeToBuildData(buildCode: string): BuildData {
	const hexString = atob(buildCode);

	const compressed = new Uint8Array(hexString.length / 2);
	for (let i = 0; i < hexString.length; i += 2) {
		const hex = hexString.substring(i, i + 2);
		const charCode = parseInt(hex, 16);
		compressed[i / 2] = charCode;
	}

	const uncompressed = ungzip(compressed);

	const json = String.fromCharCode(...uncompressed);

	const buildData = JSON.parse(json) as BuildData;
	return buildData;
}
