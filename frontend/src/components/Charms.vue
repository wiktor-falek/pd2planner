<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { Item } from "../core/items/bases";
import { uniques } from "../core/items/uniques";
import { useItemStore } from "../stores/itemStore";
import {
	getModifierTooltip,
	type ItemModifier,
	type SingleItemModifier,
} from "../core/items/modifiers";
import { corruptionModifiers } from "../core/items/corruptions";
import { useCharacterStore } from "../stores/characterStore";

const itemStore = useItemStore();
const characterStore = useCharacterStore();

const uniqueCharms = Object.values(uniques.charm);
const magicCharms: Item[] = [];
const charmList: Item[] = [...uniqueCharms, ...magicCharms];

function selectCharm(item: Item | null) {
	itemStore.selectedCharm = item;
}

const modalIsOpen = ref(false);

const rollableModifiers = computed<SingleItemModifier[] | null>(
	() =>
		itemStore.selectedCharm?.basemods
			.concat(itemStore.selectedCharm?.affixes)
			.concat(itemStore.selectedCharm.corruptedModifier ?? [])
			.flatMap((affix) => ("modifiers" in affix ? affix.modifiers : affix))
			.filter((affix) => affix.values.some((value) => value.rolls)) ?? null
);

const selectedModifier = ref<SingleItemModifier | null>(null);

const selectedCorruptedModifier = ref<ItemModifier | null>(null);

watch(selectedCorruptedModifier, (newSelectedCorruptedModifier) => {
	if (itemStore.selectedCharm === null) return;

	itemStore.selectedCharm.corruptedModifier = newSelectedCorruptedModifier;
	itemStore.selectedCharm.corrupted = newSelectedCorruptedModifier !== null;
});

watch(rollableModifiers, (newModifiers) => {
	if (newModifiers === null) {
		selectedModifier.value = null;
	} else {
		selectedModifier.value = newModifiers[0] ?? null;
	}
});

onMounted(() => {
	if (rollableModifiers.value) {
		selectedModifier.value = rollableModifiers.value[0] ?? null;
	}
});
</script>

<template>
	<div class="container">
		<img class="inventory" src="../assets/charms/charm_inventory.png" alt="" />
		<div class="charm-list">
			<div class="item-listing" v-for="item in charmList" @click="selectCharm(item)">
				<p
					:class="{
						[item.rarity]: true,
					}"
				>
					{{ item.name }}, {{ item.baseName }}
				</p>
			</div>
		</div>

		<div class="button-container" v-if="itemStore.selectedCharm">
			<button
				v-if="itemStore.selectedCharmIsAdded"
				@click="itemStore.removeSelectedCharmFromBuild()"
			>
				Remove
			</button>
			<button v-else @click="itemStore.addSelectedCharmToBuild()">Add to build</button>
			<button @click="selectCharm(null)">Cancel</button>
		</div>
		<div class="button-container" v-else>
			<button @click="modalIsOpen = true">Craft Item</button>
		</div>

		<div class="selected-item-container">
			<div v-if="itemStore.selectedCharm" class="selected-item-container__item-options">
				<div v-if="itemStore.selectedCharm.rarity === 'magic'" class="label-input">
					<label for="name">Name:</label>
					<input id="name" type="text" v-model="itemStore.selectedCharm.name" />
				</div>

				<div class="label-input" v-if="itemStore.selectedCharm.name === 'Annihilus'">
					<label for="corrupted">Corrupted: </label>
					<select id="corrupted" class="select" v-model="selectedCorruptedModifier">
						<option :value="null">None</option>
						<option
							v-for="modifier in corruptionModifiers[itemStore.selectedCharm.type]"
							:value="modifier"
						>
							{{
								"modifiers" in modifier
									? modifier.modifiers[0].description + ", " + modifier.modifiers[1].description
									: modifier.description
							}}
						</option>
					</select>
				</div>

				<div class="modifiers" v-if="itemStore.selectedCharm.rarity === 'magic'">
					<div class="label-input">
						<label>Prefix: </label>
						<select>
							<option value="">None</option>
							<!-- TODO: render and bind actual modifiers -->
							<option value="life">Life</option>
							<option value="mana">Mana</option>
						</select>
					</div>
					<div class="label-input">
						<label>Suffix: </label>
						<select>
							<option value="">None</option>
							<option value="life">Life</option>
							<option value="mana">Mana</option>
						</select>
					</div>
				</div>

				<div class="label-input">
					<select
						v-if="rollableModifiers?.length"
						v-model="selectedModifier"
						class="select"
						name=""
						id=""
					>
						<option :value="modifier" v-for="modifier in rollableModifiers" :key="modifier.id">
							{{ modifier.description }}
						</option>
					</select>

					<div v-for="value in selectedModifier?.values">
						<input
							v-if="value.rolls"
							ref="modifierRangeInput"
							class="rollable-modifier-range"
							type="range"
							v-model="value._value"
							:min="value.rolls[0]"
							:max="value.rolls[1]"
							@input="value._value = parseInt(($event.target as HTMLInputElement).value)"
						/>
					</div>
				</div>

				<div class="selected-item">
					<p :class="{ [itemStore.selectedCharm.rarity]: true }">
						{{ itemStore.selectedCharm.name }}
						<span v-if="itemStore.selectedCharm.sockets"
							>[{{ itemStore.selectedCharm.sockets }}]</span
						>
					</p>

					<p :class="{ [itemStore.selectedCharm.rarity]: true }">
						{{ itemStore.selectedCharm.baseName }}
					</p>

					<p
						v-if="itemStore.selectedCharm.requirements.level"
						:class="{
							red: itemStore.selectedCharm.requirements.level > characterStore.characterLevel,
						}"
					>
						Requires Level: {{ itemStore.selectedCharm.requirements.level }}
					</p>

					<p class="corrupted" v-if="itemStore.selectedCharm.corrupted">Corrupted</p>

					<p class="magic" v-for="affix in itemStore.selectedCharm.affixes">
						{{ getModifierTooltip(affix, characterStore.characterLevel) }}
					</p>
					<p class="magic" v-if="itemStore.selectedCharm.corruptedModifier">
						{{
							getModifierTooltip(
								itemStore.selectedCharm.corruptedModifier,
								characterStore.characterLevel
							)
						}}<span class="corrupted">*</span>
					</p>
				</div>
			</div>
			<div>
				<p for="" class="label">All Items:</p>
				<div class="all-items">
					<div
						class="item-listing"
						v-for="charm in itemStore.items.filter((item) => item.type === 'charm')"
						@click="selectCharm(charm)"
					>
						<p
							:class="{
								[charm.rarity]: true,
							}"
						>
							{{ charm.name }}, {{ charm.baseName }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 16px;
}

.inventory {
	width: calc(298px * 1.5);
}

.charm-list {
	border: 1px solid gray;
	height: 207px;
	overflow-y: auto;
}

.item-listing {
	border-top: 1px solid rgba(0, 0, 0, 0);
	border-bottom: 1px solid rgba(0, 0, 0, 0);
}

.item-listing:hover {
	border-color: white;
}
</style>
