<script setup lang="ts">
import { ref } from "vue";
import { uniques, type Item } from "../data/items";

// const itemStore = useItemStore();

const allItems = ref<Item[]>([uniques.helmets["Harlequin Crest"]]);

const selectedItem = ref<Item | null>(null);
</script>

<template>
	<div class="items">
		<div class="">
			<label for="">Equipped Items:</label>
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
		<div class="container">
			<div>
				<label for="">All Items:</label>
				<div class="all-items">
					<div class="item-listing" v-for="item in allItems">
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
					<div class="item-listing" v-for="item in Object.values(uniques.helmets)">
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
	</div>
</template>

<style scoped>
.items {
	display: flex;
	gap: 16px;
}

.container {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.equipped-items {
	width: 380px;
	height: 460px;
	border: 1px solid gray;
}

.equipped-item {
}

.item-select {
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
</style>
