<script setup lang="ts">
import { computed, ref, toRaw } from "vue";
import { uniques, type Item } from "../data/items";

// const itemStore = useItemStore();

const allItems = ref<Set<Item>>(new Set());

const selectedItem = ref<Item | null>(null);

function selectItem(item: Item) {
	selectedItem.value = item;
}

function addSelectedItemToList() {
	if (selectedItem.value === null) return;

	const clone = structuredClone(toRaw(selectedItem.value));
	allItems.value.add(clone);
	selectedItem.value = null;
}

const selectedItemInList = computed(() => {
	if (selectedItem.value === null) return false;
	return allItems.value.has(selectedItem.value);
});

function removeSelectedItemFromList() {
	if (selectedItem.value === null) return false;
	allItems.value.delete(selectedItem.value);
}
</script>

<template>
	<div class="items">
		<div class="left">
			<p for="" class="label">Equipped Items:</p>
			<div class="equipped-items">
				<div class="equipped-item">
					<label for="">Main hand:</label>
					<select name="" id="" class="item-select"></select>
				</div>
				<div class="">
					<label for="">Off hand:</label>
					<select name="" id="" class="item-select"></select>
				</div>

				<div class="">
					<label for="">Helmet:</label>
					<select name="" id="" class="item-select">
						<option value="">Shako</option>
					</select>
				</div>
			</div>
		</div>
		<div class="middle">
			<div>
				<p for="" class="label">All Items:</p>
				<div class="all-items">
					<div class="item-listing" v-for="item in allItems.values()" @click="selectItem(item)">
						<p
							:class="{
								[item.rarity]: true,
							}"
						>
							{{ item.name }}, {{ item.baseName }}
						</p>
					</div>
				</div>
			</div>
			<div>
				<input class="search" type="text" placeholder="Search" />
				<div class="unique-and-set-item-list">
					<div
						class="item-listing"
						v-for="item in Object.values(uniques.helmets)"
						@click="selectItem(item)"
					>
						<p
							:class="{
								[item.rarity]: true,
							}"
						>
							{{ item.name }}, {{ item.baseName }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="right">
			<div class="idk" v-if="selectedItem">
				<button v-if="selectedItemInList" @click="removeSelectedItemFromList()">Remove</button>
				<button v-else @click="addSelectedItemToList()">Add to build</button>
				<button @click="selectedItem = null">Cancel</button>
			</div>
			<div class="idk" v-else>
				<button>Craft Item</button>
			</div>
			<div class="selected-item">
				<div class="" v-if="selectedItem">
					<p :class="{ [selectedItem.rarity]: true }">{{ selectedItem.name }}</p>
					<p :class="{ [selectedItem.rarity]: true }">{{ selectedItem.baseName }}</p>
					<br />
					<p v-if="selectedItem.defense">
						Defense: {{ selectedItem.defense[0] }} - {{ selectedItem.defense[1] }}
					</p>
					<br />
					<p class="magic" v-for="item in selectedItem.modifiers">{{ item.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.items {
	display: flex;
	gap: 16px;
}

.middle {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.equipped-items {
	width: 320px;
	height: 460px;
	border: 1px solid gray;
}

.equipped-item {
}

.item-select {
}

.selected-item {
	width: 320px;
	height: 460px;
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
</style>
