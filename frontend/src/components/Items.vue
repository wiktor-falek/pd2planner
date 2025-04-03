<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { uniques } from "../data/items";
import { getModifierTooltip, type ItemModifier } from "../data/modifiers";
import { useCharacterStore } from "../stores/characterStore";
import { useItemStore } from "../stores/itemStore";
import { ALL_ITEM_BASE_TYPES, type CraftableRarity, type ItemBaseType, type Slot } from "../types";
import { useAttributeStore } from "../stores/attributeStore";
import { attributeInfo } from "../data/attributes";
import Modal from "./reusable/Modal.vue";
import { bases, type Item } from "../data/bases";

const characterStore = useCharacterStore();
const itemStore = useItemStore();
const attributeStore = useAttributeStore();

function selectEquippedItem(e: Event, slot: Slot) {
	const selectElement = e.target as HTMLSelectElement;
	const index = parseInt(selectElement.value);
	itemStore.equippedItems[slot].selected = index;
}

const rollableModifiers = computed<ItemModifier[] | null>(
	() =>
		itemStore.selectedItem?.basemods
			.concat(itemStore.selectedItem?.affixes)
			.filter((mod) => mod.rolls) ?? null
);
const selectedModifier = ref<ItemModifier | null>(null);

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

watch(selectedModifier, async (newSelectedModifier) => {
	if (newSelectedModifier) {
		await nextTick();
		if (modifierRangeInput.value) {
			modifierRangeInput.value.value = newSelectedModifier._value.toString();
		}
	}
});

const modifierRangeInput = ref<HTMLInputElement>();

const modalIsOpen = ref(false);

const craftingItem = ref<{ name: string; rarity: CraftableRarity; type: ItemBaseType; baseName: string }>({
	name: "New Item",
	rarity: "rare",
	type: "weapon",
	baseName: Object.values(bases.weapon)[0]!.baseName,
});

watch(() => craftingItem.value.type, (newType) => {
	const firstDropdownItem = Object.values(bases[newType])[0];
	if (firstDropdownItem === undefined) {
		craftingItem.value.baseName = "";
	} else {
		craftingItem.value.baseName = firstDropdownItem.baseName;
	}
})

function craftItem() {
	const { name, rarity, type, baseName } = craftingItem.value;

	if (!(baseName in bases[type])) {
		console.error(`Item base '${baseName}' not found.`);
		return;
	}

	const typeBases = bases[type];
	const base = typeBases[baseName as keyof typeof typeBases] as Item;

	const item: Item = {
		...base, name, rarity, type, baseName
	};

	itemStore.selectItem(item);

	modalIsOpen.value = false;
}
</script>

<template>
	<div class="items">
		<Modal :is-open="modalIsOpen" @close="modalIsOpen = false">
			<div class="modal">
				<p>Craft Item</p>

				<div class="label-input">
					<label for="">Name:</label>
					<input type="text" v-model="craftingItem.name" />
				</div>

				<div class="label-input">
					<label for="">Rarity:</label>
					<select name="" id="" v-model="craftingItem.rarity">
						<option value="normal">Normal</option>
						<option value="magic">Magic</option>
						<option value="rare">Rare</option>
						<option value="crafted">Crafted</option>
					</select>
				</div>

				<div class="label-input">
					<label for="">Slot:</label>
					<select name="" id="" v-model="craftingItem.type">
						<option v-for="type in ALL_ITEM_BASE_TYPES" :value="type">{{ type }}</option>
					</select>
				</div>

				<!-- TODO: subclass if weapon -->

				<div class="label-input">
					<label for="">Base:</label>
					<select name="" id="" v-model="craftingItem.baseName">
						<option v-for="base in Object.values(bases[craftingItem.type])" :value="base.baseName">
							{{ base.baseName }}
						</option>
					</select>
				</div>

				<div class="">
					<button @click="craftItem()">Create</button>
					<button @click="modalIsOpen = false">Close</button>
				</div>
			</div>
		</Modal>
		<div class="left">
			<div>
				<p for="" class="label">Equipped Items:</p>
				<div class="equipped-items">
					<div class="equipped-item label-input">
						<label for="">Weapon 1:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'weapon-1')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['weapon-1'].items"
								:value="index + 1"
								:selected="itemStore.equippedItems['weapon-1'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>
					<div class="equipped-item label-input">
						<label for="">Weapon 2:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'weapon-2')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['weapon-2'].items"
								:value="index + 1"
								:selected="itemStore.equippedItems['weapon-2'].selected === index + 1">
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
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'chest')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['chest'].items" :value="index + 1"
								:selected="itemStore.equippedItems['chest'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Gloves:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'gloves')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['gloves'].items" :value="index + 1"
								:selected="itemStore.equippedItems['gloves'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Boots:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'boots')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['boots'].items" :value="index + 1"
								:selected="itemStore.equippedItems['boots'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Amulet:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'amulet')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['amulet'].items" :value="index + 1"
								:selected="itemStore.equippedItems['amulet'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Ring 1:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'ring-1')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['ring-1'].items" :value="index + 1"
								:selected="itemStore.equippedItems['ring-1'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Ring 2:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'ring-2')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['ring-2'].items" :value="index + 1"
								:selected="itemStore.equippedItems['ring-2'].selected === index + 1">
								{{ item.name }}, {{ item.baseName }}
							</option>
						</select>
					</div>

					<div class="equipped-item label-input">
						<label for="">Belt:</label>
						<select name="" id="" class="item-select" @change="selectEquippedItem($event, 'belt')">
							<option value="0">None</option>
							<option v-for="(item, index) in itemStore.equippedItems['belt'].items" :value="index + 1"
								:selected="itemStore.equippedItems['belt'].selected === index + 1">
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
				<button @click="modalIsOpen = true">Craft Item</button>
			</div>
			<div class="thingy">
				<div v-if="itemStore.selectedItem">
					<div class="label-input">
						<label for="ethereal">Sockets</label>
						<select name="" id="" v-model="itemStore.selectedItem.sockets">
							<option v-for="i in itemStore.selectedItem.maxSockets + 1" :value="i - 1">
								{{ i - 1 }}
							</option>
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

					<div v-if="itemStore.selectedItem.rarity === 'rare' || itemStore.selectedItem.rarity === 'magic'">
						<!-- TODO: crafted rarity having 1 crafted affix + 4 affixes, 3 prefixes 3 suffixes at most -->
						<div class="label-input" v-for="n in (itemStore.selectedItem.rarity === 'rare' ? 3 : 1)"
							:key="'prefix-' + n">
							<label>Prefix:</label>
							<select>
								<option value="">None</option>
								<option value="life">Life</option>
								<option value="mana">Mana</option>
							</select>
						</div>
						<div class="label-input" v-for="n in (itemStore.selectedItem.rarity === 'rare' ? 3 : 1)"
							:key="'suffix-' + n">
							<label>Suffix:</label>
							<select>
								<option value="">None</option>
								<option value="life">Life</option>
								<option value="mana">Mana</option>
							</select>
						</div>
					</div>

					<div class="label-input">
						<select v-if="rollableModifiers?.length" v-model="selectedModifier" class="rollable-modifier"
							name="" id="">
							<option :value="modifier" v-for="modifier in rollableModifiers" :key="modifier.id">
								{{ modifier.description }}
							</option>
						</select>

						<input v-if="selectedModifier?.rolls" ref="modifierRangeInput" class="rollable-modifier-range"
							type="range" v-model="selectedModifier._value" :min="selectedModifier.rolls[0]"
							:max="selectedModifier.rolls[1]"
							@input="selectedModifier._value = parseInt(($event.target as HTMLInputElement).value)" />
					</div>


					<div class="selected-item">
						<p :class="{ [itemStore.selectedItem.rarity]: true }">
							{{ itemStore.selectedItem.name }}
							<span v-if="itemStore.selectedItem.sockets">[{{ itemStore.selectedItem.sockets }}]</span>
						</p>
						<p :class="{ [itemStore.selectedItem.rarity]: true }">
							{{ itemStore.selectedItem.baseName }}
						</p>

						<p v-if="itemStore.selectedItem.requirements.level" :class="{
							red: itemStore.selectedItem.requirements.level > characterStore.characterLevel,
						}">
							Requires Level: {{ itemStore.selectedItem.requirements.level }}
						</p>

						<p v-if="itemStore.selectedItem.requirements.strength" :class="{
							red:
								itemStore.selectedItem.requirements.strength >
								attributeInfo[characterStore.characterClass].strength.base +
								attributeStore.attributes.strength,
						}">
							Requires {{ itemStore.selectedItem.requirements.strength }} Strength
						</p>

						<p v-if="itemStore.selectedItem.requirements.dexterity" :class="{
							red:
								itemStore.selectedItem.requirements.dexterity >
								attributeInfo[characterStore.characterClass].dexterity.base +
								attributeStore.attributes.dexterity,
						}">
							Requires {{ itemStore.selectedItem.requirements.dexterity }} Dexterity
						</p>


						<p v-for="basemod in itemStore.selectedItem.basemods">
							{{ getModifierTooltip(basemod) }}
						</p>

						<p class="corrupted" v-if="itemStore.selectedItem.corrupted">Corrupted</p>

						<p class="magic" v-for="affix in itemStore.selectedItem.affixes">
							{{ getModifierTooltip(affix, characterStore.characterLevel) }}
						</p>
						<p class="ethereal" v-if="itemStore.selectedItem.ethereal">
							Ethereal (Cannot Be Repaired)
						</p>
					</div>
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
	height: 207px;
	overflow-y: auto;
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

.rollable-modifier {
	max-width: 240px;
}

.rollable-modifier-range {
	max-width: 120px;
}

.modal {
	padding: 8px;
	border: 1px solid gray;
}
</style>
