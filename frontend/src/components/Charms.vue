<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { uniques } from "../core/items/unique";
import { useItemStore, type GridItem } from "../stores/itemStore";
import {
	getModifierDescription,
	getModifierTooltip,
	type ItemModifier,
	type SingleItemModifier,
} from "../core/items/modifiers";
import { corruptionModifiers } from "../core/items/corruptions";
import { useCharacterStore } from "../stores/characterStore";
import { magic } from "../core/items/magic";
import { baseToMagic, type Item } from "../core/items/item";
import * as grid from "../utils/grid";
import { bases } from "../core/items/bases";
import { useModalStore } from "../stores/modalStore";
import Modal from "./reusable/Modal.vue";

const SQUARE_SIZE = 29;
const INVENTORY_SCALE = 1.5;

const modalStore = useModalStore();
const itemStore = useItemStore();
const characterStore = useCharacterStore();

const uniqueCharms = Object.values(uniques.charm);
const magicCharms = Object.values(magic.charm);
const charmList = [...uniqueCharms, ...magicCharms];

const rollableModifiers = computed<SingleItemModifier[] | null>(
	() =>
		itemStore.selectedCharm?.affixes
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

const craftingItem = ref<{
	name: string;
	baseName: string;
}>({
	name: "New Charm",
	baseName: Object.values(bases.charm)[0]!.baseName,
});

function craftCharm() {
	const { name, baseName } = craftingItem.value;

	if (!(baseName in bases.charm)) {
		console.error(`Item base '${baseName}' not found.`);
		return;
	}

	const base = bases.charm[baseName as keyof typeof bases.charm];

	const charm = baseToMagic(base, name, []);

	itemStore.selectCharm(charm);
	modalStore.close();
}

function addCharmToGrid(charm: Item, x: number, y: number): boolean {
	const [width, height] = charm.size!;
	const added = grid.addItemAt(itemStore.charmGrid, charm, x, y, width, height);

	if (!added) return false;

	const gridItem: GridItem = { item: charm, x, y };
	itemStore.equippedCharms.push(gridItem);
	return true;
}

const draggedItem = ref<Item | null>(null);
const dragOrigin = ref<{ x: number; y: number } | null>(null);

const isDroppedOutside = ref(true);

function startDrag(e: DragEvent, item: Item) {
	draggedItem.value = item;

	const image = new Image();
	image.src = `../src/assets/${item.img}`;
	image.width = 28 * (item.size?.[0] ?? 0);
	image.height = 28 * (item.size?.[1] ?? 0);
	e.dataTransfer?.setDragImage(image, image.width / 4, 0);
}

function startMoveDrag(e: DragEvent, item: Item, x: number, y: number) {
	dragOrigin.value = { x, y };
	startDrag(e, item);
}

function onDrop(e: DragEvent, x: number, y: number) {
	isDroppedOutside.value = false;

	e.preventDefault();
	const charm = draggedItem.value;
	if (charm === null) return;

	// case 1: add from list i.e. no dragOrigin
	if (!dragOrigin.value) {
		addCharmToGrid(charm, x, y);
		return;
	}

	// TODO: swap two charms

	// case 2. drag in inventory i.e. remove -> add -> revert remove if not added
	const square = grid.getSquare(itemStore.charmGrid, dragOrigin.value.x, dragOrigin.value.y);
	if (!square?.value) return;

	unequipSquare(square);

	const added = addCharmToGrid(charm, x, y);

	if (!added) {
		addCharmToGrid(charm, square.originX, square.originY);
	}
}

function endDrag(e: DragEvent) {
	e.preventDefault();

	// unequip if dragged outside of drop zone
	if (isDroppedOutside.value && draggedItem.value !== null && dragOrigin.value !== null) {
		const square = grid.getSquare(itemStore.charmGrid, dragOrigin.value.x, dragOrigin.value.y);
		if (square !== null) {
			unequipSquare(square);
		}
	}

	isDroppedOutside.value = true;
	draggedItem.value = null;
	dragOrigin.value = null;
}

function resolveImgPath(imgSrc: string) {
	const url = new URL("../assets/" + imgSrc, import.meta.url).href;
	return url;
}

function unequipSquare(square: grid.GridSquare<Item>) {
	const [width, height] = square.value!.size!;
	const charm = grid.getSquare(itemStore.charmGrid, square.originX, square.originY)?.value;
	if (!charm) return;

	grid.removeItemAt(itemStore.charmGrid, square.originX, square.originY, width, height);
	itemStore.equippedCharms = itemStore.equippedCharms.filter(
		(gridItem) => !(gridItem.x === square.originX && gridItem.y === square.originY)
	);
}
</script>

<template>
	<div class="container">
		<Modal :is-open="modalStore.activeModalId === 'craft-charm'" @close="modalStore.close()">
			<div class="modal">
				<div class="modal__titlebar">
					<p class="modal__titlebar__title">Craft Charm</p>
				</div>

				<div class="label-input">
					<label for="">Name:</label>
					<input type="text" v-model="craftingItem.name" />
				</div>

				<div class="label-input">
					<label for="">Base:</label>
					<select name="" id="" v-model="craftingItem.baseName">
						<option v-for="baseName in Object.keys(bases.charm)" :value="baseName">
							{{ baseName }}
						</option>
					</select>
				</div>

				<div class="modal__buttons">
					<button @click="craftCharm()">Create</button>
					<button @click="modalStore.close()">Close</button>
				</div>
			</div>
		</Modal>
		<div class="left">
			<div>
				<p for="" class="label">All Charms:</p>
				<div class="all-items">
					<div
						class="item-listing"
						draggable="true"
						@dragstart="startDrag($event, charm)"
						@dragend="endDrag($event)"
						v-for="charm in itemStore.items.filter((item) => item.type === 'charm')"
						@click="itemStore.selectCharm(charm)"
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

		<div class="middle">
			<div class="inventory">
				<img class="inventory-background" src="../assets/charms/charm_inventory.png" />
				<div v-for="y in 4">
					<div
						class="inventory-square"
						v-for="x in 10"
						:style="{
							left: `${7 + (x - 1) * (SQUARE_SIZE * INVENTORY_SCALE)}px`,
							top: `${5 + (y - 1) * (SQUARE_SIZE * INVENTORY_SCALE)}px`,
						}"
						dropzone="copy"
						@drop="onDrop($event, x - 1, y - 1)"
						@dragover.prevent
						@dragenter.prevent
					>
						<template v-for="square in [grid.getSquare(itemStore.charmGrid, x - 1, y - 1)]">
							<img
								v-if="square && square.value && square.isOriginSquare"
								class="inventory-item-img"
								:src="resolveImgPath(square.value.img!)"
								@click.left="itemStore.selectCharm(square.value)"
								@click.right="unequipSquare(square)"
								@dragstart="startMoveDrag($event, square.value, square.originX, square.originY)"
								@dragend="endDrag($event)"
								:style="{
									'pointer-events':
										dragOrigin?.x === square.originX && dragOrigin.y === square.originY
											? 'none'
											: 'all',
								}"
							/>
						</template>
					</div>
				</div>
			</div>

			<div>
				<input class="search" type="text" placeholder="Search" />
				<!-- v-model.trim="filterQuery" -->
				<div class="charm-list">
					<div
						class="item-listing"
						v-for="charm in charmList"
						@click="itemStore.selectCharm(charm)"
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

		<div class="right">
			<div class="button-container" v-if="itemStore.selectedCharm">
				<button
					v-if="itemStore.selectedCharmIsAdded"
					@click="itemStore.removeSelectedCharmFromBuild()"
				>
					Remove
				</button>
				<button v-else @click="itemStore.addSelectedCharmToBuild()">Add to build</button>
				<button @click="itemStore.selectCharm(null)">Cancel</button>
			</div>
			<div class="button-container" v-else>
				<button @click="modalStore.open('craft-charm')">Craft Charm</button>
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
								{{ getModifierDescription(modifier) }}
							</option>
						</select>
					</div>

					<!-- <div class="modifiers" v-if="itemStore.selectedCharm.rarity === 'magic'">
					<div class="label-input">
						<label>Prefix: </label>
						<select>
							<option value="">None</option>
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
				</div> -->

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
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16px;
}

.left {
	width: 380px;
}

.middle {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 16px;
	padding-top: 36px;
}

.right {
	width: 360px;
}

.left,
.middle,
.right {
	height: 100%;
}

.inventory {
	position: relative;
}

.inventory-background {
	width: calc(298px * v-bind(INVENTORY_SCALE));
}

.inventory-square {
	position: absolute;
	width: calc(1px * v-bind(SQUARE_SIZE) * v-bind(INVENTORY_SCALE));
	aspect-ratio: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.inventory-item-img {
	cursor: grab;
	z-index: 1000;
}

.all-items {
	width: 380px;
	height: 460px;
	border: 1px solid gray;
}

.item-listing {
	border-top: 1px solid rgba(0, 0, 0, 0);
	border-bottom: 1px solid rgba(0, 0, 0, 0);
	cursor: grab;
}

.item-listing p {
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis; /* or clip? */
}

.item-listing:hover {
	border-color: white;
}

.charm-list {
	border: 1px solid gray;
	height: 240px;
	overflow-y: scroll;
	width: 445px;
}

.search {
	width: 100%;
	box-sizing: border-box;
}

.button-container {
	display: flex;
	gap: 8px;
	margin-bottom: 4px;
}

.selected-item {
	padding: 4px;
	border: 1px solid gray;
}

.modal {
	position: relative;
	border: 1px solid gray;
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 12px;
	padding-top: 24px;
	background-color: black;
}

.modal__titlebar {
	position: absolute;
	top: -15px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
}

.modal__titlebar__title {
	background-color: black;
	border: 1px solid gray;
	padding: 2px 8px;
	margin: 0;
}

.modal > .label-input > label {
	margin-left: auto;
}

.modal > .label-input > input,
.modal > .label-input > select {
	box-sizing: border-box;
	width: 200px;
}

.modal__buttons {
	margin-top: 12px;
	display: flex;
	justify-content: space-around;
}
</style>
