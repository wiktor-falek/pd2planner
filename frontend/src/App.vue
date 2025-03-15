<script setup lang="ts">
import { ref } from "vue";
import SkillTree from "./components/SkillTree.vue";
import Attributes from "./components/Attributes.vue";
import Items from "./components/Items.vue";
import { useCharacterStore } from "./stores/characterStore";
import type { CharacterClass } from "./types";
import { useSkillStore } from "./stores/skillStore";
import { useAttributeStore } from "./stores/attributeStore";

const characterStore = useCharacterStore();
const attributeStore = useAttributeStore();
const skillStore = useSkillStore();

type Tab = "items" | "skill-tree" | "attributes";
const selectedTab = ref<Tab>("items");
</script>

<template>
	<div class="app" @contextmenu.prevent>
		<header>
			<div class="label-input">
				<label for="character-class">Class&nbsp;</label>
				<select id="character-class" name="character-class" :value="characterStore.characterClass" @change="
					characterStore.setCharacterClass(
						($event.target as HTMLSelectElement).value as CharacterClass
					)
					">
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
				<label for="character-level">Level&nbsp;</label>
				<input id="character-level" type="number" min="1" max="99" :value="characterStore.characterLevel"
					@change="
						characterStore.setCharacterLevel(parseInt(($event.target as HTMLInputElement).value))
						" />
			</div>

			<div>
				<label for="skill-points">Skill Points:&nbsp;</label>
				<span id="skill-points">
					<span :class="{
						red: skillStore.allocatedSkillPoints > skillStore.totalSkillPoints,
					}">{{ skillStore.allocatedSkillPoints }}</span>
					<span>/</span>
					<span>{{ skillStore.totalSkillPoints }}</span>
				</span>
			</div>

			<div>
				<label for="attribute-points">Attribute Points:&nbsp;</label>
				<span id="attribute-points">
					<span :class="{
						red: attributeStore.allocatedAttributePoints > attributeStore.totalAttributePoints,
					}">{{ attributeStore.allocatedAttributePoints }}</span>
					<span>/</span>
					<span>{{ attributeStore.totalAttributePoints }}</span>
				</span>
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
				<SkillTree v-else-if="selectedTab === 'skill-tree'"></SkillTree>
				<Attributes v-else-if="selectedTab === 'attributes'"></Attributes>
			</div>

			<div class="navigation-panel">
				<button @click="selectedTab = 'items'">Items</button>
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
}

header {
	display: flex;
	gap: 20px;
	flex: 0 1 auto;
	background-color: #282828;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 2px 0;
}

.container {
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
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
}

.main {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	position: relative;
	z-index: 0;
}
</style>
