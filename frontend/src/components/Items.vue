<script setup lang="ts">
import { uniques } from "../data/items";
import { useItemStore } from "../stores/itemStore";

const itemStore = useItemStore();

</script>

<template>
	<div class="items">
		<div class="left">
			<div>
				<p for="" class="label">Equipped Items:</p>
				<div class="equipped-items">
					<div class="equipped-item">
						<label for="">Weapon 1:</label>
						<select name="" id="" class="item-select"></select>
					</div>
					<div class="equipped-item">
						<label for="">Weapon 2:</label>
						<select name="" id="" class="item-select"></select>
					</div>

					<div class="equipped-item">
						<label for="">Helmet:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Chest:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Gloves:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Boots:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Amulet:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Ring 1:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Ring 2:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>


					<div class="equipped-item">
						<label for="">Belt:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<p for="" class="label">Mercenary Items:</p>

				<div class="equipped-items--mercenary">
					<div class="equipped-item">
						<label for="">Weapon 1:</label>
						<select name="" id="" class="item-select"></select>
					</div>
					<div class="equipped-item">
						<label for="">Weapon 2:</label>
						<select name="" id="" class="item-select"></select>
					</div>

					<div class="equipped-item">
						<label for="">Helmet:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item">
						<label for="">Chest:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item">
						<label for="">Gloves:</label>
						<select name="" id="" class="item-select">
							<option value=""></option>
						</select>
					</div>
					<div class="equipped-item">
						<label for="">Boots:</label>
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
				<button v-if="itemStore.selectedItemIsAdded"
					@click="itemStore.removeSelectedItemFromBuild()">Remove</button>
				<button v-else @click="itemStore.addSelectedItemToBuild()">Add to build</button>
				<button @click="itemStore.selectItem(null)">Cancel</button>
			</div>
			<div class="idk" v-else>
				<button>Craft Item</button>
			</div>
			<div class="thingy">
				<div class="selected-item" v-if="itemStore.selectedItem">
					<p :class="{ [itemStore.selectedItem.rarity]: true }">{{ itemStore.selectedItem.name }}</p>
					<p :class="{ [itemStore.selectedItem.rarity]: true }">{{ itemStore.selectedItem.baseName }}</p>
					<br />
					<p v-if="itemStore.selectedItem.defense">
						Defense: {{ itemStore.selectedItem.defense[0] }} - {{ itemStore.selectedItem.defense[1] }}
					</p>
					<br />
					<p class="magic" v-for="item in itemStore.selectedItem.modifiers">{{ item.description }}</p>
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
</style>
