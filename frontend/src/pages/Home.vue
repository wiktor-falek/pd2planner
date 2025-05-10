<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import SkillTree from "../components/SkillTree.vue";
import Attributes from "../components/Attributes.vue";
import Items from "../components/Items.vue";
import Charms from "../components/Charms.vue";
import { useCharacterStore } from "../stores/characterStore";
import type { CharacterClass } from "../types";
import { useSkillStore } from "../stores/skillStore";
import { useAttributeStore } from "../stores/attributeStore";
import { serializeBuildDataToBuildCode } from "../core/serialization/buildCodeSerialization";
import { getBuildData, resetBuild } from "../core/build/buildData";
import { createBuild } from "../api";
import router from "../router";
import Modal from "../components/reusable/Modal.vue";
import { useModalStore } from "../stores/modalStore";

const modalStore = useModalStore();
const characterStore = useCharacterStore();
const attributeStore = useAttributeStore();
const skillStore = useSkillStore();

type Tab = "items" | "charms" | "skill-tree" | "attributes";
const selectedTab = ref<Tab>("items");

async function handleExportBuild() {
	const buildCode = serializeBuildDataToBuildCode(getBuildData());
	const buildId = await createBuild(buildCode);

	if (buildId === null) {
		// TODO: handle error
		return;
	}

	window.open(router.resolve({ name: "build", params: { buildId } }).href, "_blank");
}

async function handleImportBuild() {}

function handleOpenResetBuildModal() {
	modalStore.open("reset-build");
}

function handleResetBuild() {
	resetBuild();
	modalStore.close();
}
</script>

<template>
	<Modal :is-open="modalStore.activeModalId === 'reset-build'" @close="modalStore.close()">
		<div class="modal">
			<p class="modal__title">Are you sure you want to reset your build?</p>
			<div class="modal__buttons">
				<button @click="handleResetBuild">Reset</button>
				<button @click="modalStore.close()">Close</button>
			</div>
		</div>
	</Modal>

	<div class="app" @contextmenu.prevent>
		<header>
			<div class="header-left">
				<p>pd2planner.com</p>
			</div>

			<div class="header-middle">
				<div class="label-input">
					<label for="character-class">Class:</label>
					<select
						id="character-class"
						name="character-class"
						:value="characterStore.characterClass"
						@change="
							characterStore.setCharacterClass(
								($event.target as HTMLSelectElement).value as CharacterClass
							)
						"
					>
						<option value="amazon">Amazon</option>
						<option value="assassin">Assassin</option>
						<option value="necromancer">Necromancer</option>
						<option value="barbarian">Barbarian</option>
						<option value="paladin">Paladin</option>
						<option value="sorceress">Sorceress</option>
						<option value="druid">Druid</option>
					</select>
				</div>

				<div class="label-input">
					<label for="character-level">Level</label>
					<input
						id="character-level"
						type="number"
						min="1"
						max="99"
						:value="characterStore.characterLevel"
						@change="
							characterStore.setCharacterLevel(parseInt(($event.target as HTMLInputElement).value))
						"
					/>
				</div>

				<div class="label-input">
					<label for="skill-points">Skill Points:</label>
					<span id="skill-points">
						<span
							:class="{
								red: skillStore.allocatedSkillPoints > skillStore.totalSkillPoints,
							}"
							>{{ skillStore.allocatedSkillPoints }}</span
						>
						<span>/</span>
						<span>{{ skillStore.totalSkillPoints }}</span>
					</span>
				</div>

				<div class="label-input">
					<label for="attribute-points">Attribute Points:</label>
					<span id="attribute-points">
						<span
							:class="{
								red: attributeStore.allocatedAttributePoints > attributeStore.totalAttributePoints,
							}"
							>{{ attributeStore.allocatedAttributePoints }}</span
						>
						<span>/</span>
						<span>{{ attributeStore.totalAttributePoints }}</span>
					</span>
				</div>
			</div>

			<div class="header-right">
				<button @click="handleExportBuild()">Export</button>
				<button @click="handleImportBuild()">Import</button>
				<button @click="handleOpenResetBuildModal()">Reset</button>
			</div>
		</header>

		<div class="container">
			<div class="stat-panel">
				<p class="green">Skill Name</p>
				<p>Damage: 0-0</p>
				<br />
				<p>Life: 0</p>
				<p>Mana: 0</p>
				<br />
				<p>Fire Res: 0 (0)</p>
				<p>Cold Res: 0 (0)</p>
				<p>Lightning Res: 0 (0)</p>
				<p>Poison Res: 0 (0)</p>
				<br />
				<p>IAS: 0 (0)</p>
				<p>FCR: 0 (0)</p>
				<br />
				<p>Defense: 0</p>
				<p>FHR: 0 (0)</p>
				<p>Block: 0%</p>
				<p>FBR: 0 (0)</p>
				<br />
				<p>FRW: 0 (0%)</p>
				<p>MF: 0</p>
			</div>

			<div class="main">
				<Items v-if="selectedTab === 'items'"></Items>
				<Charms v-else-if="selectedTab === 'charms'"></Charms>
				<SkillTree v-else-if="selectedTab === 'skill-tree'"></SkillTree>
				<Attributes v-else-if="selectedTab === 'attributes'"></Attributes>
			</div>

			<div class="navigation-panel">
				<button @click="selectedTab = 'items'">Items</button>
				<button @click="selectedTab = 'charms'">Charms</button>
				<button @click="selectedTab = 'skill-tree'">Skill Tree</button>
				<button @click="selectedTab = 'attributes'">Attributes</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.app {
	user-select: none;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
}

header {
	display: flex;
	flex: 0 0 auto;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.header-middle {
	display: flex;
	gap: 20px;
	flex: 0 1 auto;
	background-color: #282828;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 2px 0;
}

.header-right {
	display: flex;
	gap: 8px;
}

.container {
	flex: 1 1 auto;
	width: 100%;
	margin-top: 12px;
	position: relative;
}

.stat-panel,
.navigation-panel {
	background-color: rgb(33, 33, 33);
	position: absolute;
	top: 0;
	bottom: 0;
	z-index: 1;
}

.stat-panel {
	width: 240px;
}

.navigation-panel {
	width: 180px;
	right: 0;
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.navigation-panel button {
	width: auto;
	text-align: center;
	padding: 4px 0;
	background-color: #585858;
	color: var(--font-color);
}

.navigation-panel button:hover {
	background-color: #585858;
}

.main {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	position: relative;
	z-index: 0;
	height: 100%;
}

.modal {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	width: 240px;
	height: 120px;
	border: 1px solid gray;
	gap: 8px;
	padding: 12px;
	padding-top: 24px;
	background-color: black;
}

.modal__buttons {
	display: flex;
	width: 100%;
	justify-content: space-around;
}
</style>
