<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { type BuildData } from "../core/build/buildData";
import { getBuildCode } from "../api";
import { deserializeBuildCodeToBuildData } from "../core/serialization/buildCodeSerialization";

const route = useRoute();
const buildId = route.params.buildId as string;

const buildData = ref<BuildData | null>(null);

async function handleImportBuild() {
	// if (buildId.length !== 12 || buildId.match(/[^0-9a-z]/i)) {
	// 	console.error("Invalid build ID");
	// 	// TODO: handle error
	// 	// router.push({ name: "create-build" });
	// 	return;
	// }

	const buildCode = await getBuildCode(buildId);

	if (buildCode === null) {
		console.error("Failed to retrieve build");
		return;
	}

	// TODO: handle exceptions
	buildData.value = deserializeBuildCodeToBuildData(buildCode);
	console.log(buildData.value);
}

onBeforeMount(() => {
	handleImportBuild();
});
</script>

<template>
	<div v-if="buildData === null">Loading build...</div>
	<div v-else>
		<p>Level {{ buildData.character.level }} {{ buildData.character.class }}</p>
		<div>
			<p>Attributes</p>
			<p>Strength: {{ buildData.attributes.strength }}</p>
			<p>Dexterity: {{ buildData.attributes.dexterity }}</p>
			<p>Vitality: {{ buildData.attributes.vitality }}</p>
			<p>Energy: {{ buildData.attributes.energy }}</p>
		</div>

		<div>
			<p>Skills</p>
			<div v-for="[skillName, data] in Object.entries(buildData.skills)">
				<p v-if="data.points !== 0">{{ skillName }}: {{ data.points }}</p>
			</div>
		</div>
	</div>

	<!-- edit/open button (requires support for multiple local builds) -->
	<!-- save locally in a text file? -->
</template>
