<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { uniques, type Slot } from "../data/items";
import { getModifierTooltip, type ItemModifier } from "../data/modifiers";
import { useCharacterStore } from "../stores/characterStore";
import { useItemStore } from "../stores/itemStore";

const characterStore = useCharacterStore();
const itemStore = useItemStore();

function selectEquippedItem(e: Event, slot: Slot) {
	const selectElement = e.target as HTMLSelectElement;
	const index = parseInt(selectElement.value);
	itemStore.equippedItems[slot].selected = index;
}

const rollableModifiers = computed<ItemModifier[] | null>(() =>
	itemStore.selectedItem?.modifiers
		.concat(itemStore.selectedItem?.baseModifiers)
		.filter(mod => mod.rolls) ?? null);
const selectedModifier = ref<ItemModifier | null>(null);

watch(rollableModifiers, (newModifiers) => {
	selectedModifier.value = newModifiers?.length ? newModifiers[0] : null;
});
</script>

<template>
	<div class="items">
		<div class="left">
			<div>
				<p for="" class="label">Equipped Items:</p>
				<div class="equipped-items">
					<div class="equipped-item label-input">
						<label for="">Weapon 1:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['weapon-1'].items"
								:value="index + 1" :selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Weapon 2:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['weapon-2'].items"
								:value="index + 1" :selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Helmet:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['helmet'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Chest:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['chest'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Gloves:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['gloves'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Boots:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['boots'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Amulet:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['amulet'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Ring 1:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['ring-1'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Ring 2:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['ring-2'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Belt:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'helmet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['belt'].items" :value="index + 1"
								:selected="itemStore.equippedItems['helmet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<p for="" class="label">Mercenary Items:</p>

				<div class="equipped-items--mercenary">
					<div class="equipped-item label-input">
						<label for="">Weapon 1:</label>
						<select name="" id="" class="item-select"></select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Weapon 2:</label>
						<select name="" id="" class="item-select"></select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Helmet:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Chest:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Gloves:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Boots:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Belt:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="middle">
			<div>
				<p for="" class="label">All Items:</p>
				<div class="all-items">
					<div class="item-listing" v-for="item in itemStore.items.values()"
						@click="itemStore.selectItem(item)">
						<p :class="{
							[item.rarity]: true,
						}">
							{{ item.name }}, {{ item.baseName }}
						</p>
					</div>
				</div>
			</div>
			<div>
				<input class="search" type="text" placeholder="Search" />
				<div class="unique-and-set-item-list">
					<div class="item-listing" v-for="item in Object.values(uniques.helmets)"
						@click="itemStore.selectItem(item)">
						<p :class="{
							[item.rarity]: true,
						}">
							{{ item.name }}, {{ item.baseName }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="right">
			<div class="idk" v-if="itemStore.selectedItem">
				<button v-if="itemStore.selectedItemIsAdded" @click="itemStore.removeSelectedItemFromBuild()">
					Remove
				</button>
				<button v-else @click="itemStore.addSelectedItemToBuild()">Add to build</button>
				<button @click="itemStore.selectItem(null)">Cancel</button>
			</div>
			<div class="idk" v-else>
				<button>Craft Item</button>
			</div>
			<div class="thingy">
				<div v-if="itemStore.selectedItem">
					<div class="selected-item">
						<p :class="{ [itemStore.selectedItem.rarity]: true }">
							{{ itemStore.selectedItem.name }}
							<span v-if="itemStore.selectedItem.sockets">[{{ itemStore.selectedItem.sockets }}]</span>
						</p>
						<p :class="{ [itemStore.selectedItem.rarity]: true }">
							{{ itemStore.selectedItem.baseName }}
						</p>

						<!-- TODO: base modifiers list -->
						<p v-for="baseModifier in itemStore.selectedItem.baseModifiers">
							{{ getModifierTooltip(baseModifier) }}
						</p>

						<p class="corrupted">{{ itemStore.selectedItem.corrupted ? "Corrupted" : "&nbsp;" }}</p>
						<p class="magic" v-for="modifier in itemStore.selectedItem.modifiers">
							{{ getModifierTooltip(modifier, characterStore.characterLevel) }}

						</p>
						<p class="ethereal">
							{{ itemStore.selectedItem.ethereal ? "Ethereal (Cannot Be Repaired)" : "&nbsp;" }}
						</p>
					</div>
					<div class="label-input">
						<label for="ethereal">Sockets</label>
						<select name="" id="" v-model="itemStore.selectedItem.sockets">
							<option v-for="i in 7" :value="i - 1">{{ i - 1 }}</option>
						</select>
					</div>
					<div class="label-input">
						<label for="corrupted">Corrupted</label>
						<input id="corrupted" type="checkbox" v-model="itemStore.selectedItem.corrupted" />
					</div>
					<div class="label-input">
						<label for="ethereal">Ethereal</label>
						<input id="ethereal" type="checkbox" v-model="itemStore.selectedItem.ethereal" />
					</div>

					<div class="label-input">
						<select v-if="rollableModifiers?.length" v-model="selectedModifier" name="" id="">
							<option :value="modifier" v-for="modifier in rollableModifiers" :key="modifier.id">{{
								getModifierTooltip(modifier) }}
							</option>
						</select>
					</div>
					<input v-if="selectedModifier?.rolls" id="modifier-range" type="range"
						v-model="selectedModifier._value" :min="selectedModifier.rolls[0]"
						:max="selectedModifier.rolls[1]"
						@input="selectedModifier._value = parseInt(($event.target as HTMLInputElement).value)">
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.items {
	display: flex;
	gap: 16px;
	margin-left: 60px;
}

.left {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.middle {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.equipped-items,
.equipped-items--mercenary {
	display: flex;
	flex-direction: column;
	gap: 8px;
	/* border: 1px solid gray; */
}

.equipped-items {
	width: 320px;
	height: 460px;
}

.equipped-items--mercenary {
	width: 320px;
	height: 240px;
}

.item-select {
	width: 226px;
	margin-left: 4px;
}

.equipped-item {
	margin-left: auto;
}

.thingy {
	width: 360px;
}

.selected-item {
	padding: 4px;
	border: 1px solid gray;
}

.all-items {
	width: 380px;
	height: 460px;
	border: 1px solid gray;
}

.unique-and-set-item-list {
	border: 1px solid gray;
	height: 240px;
}

.search {
	width: 100%;
	box-sizing: border-box;
}

.item-listing {
	border-top: 1px solid rgba(0, 0, 0, 0);
	border-bottom: 1px solid rgba(0, 0, 0, 0);
}

.item-listing:hover {
	border-color: white;
}

.idk {
	display: flex;
	gap: 8px;
	margin-bottom: 4px;
}

button {
	background-color: transparent;
	color: white;
	border: 1px solid gray;
	font-size: 12px;
	padding: 2px 8px;
}

.label {
	padding-bottom: 7px;
}

.selected-item-text {}
</style>
