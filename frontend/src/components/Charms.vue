<script setup lang="ts">
import type { Item } from "../core/items/bases";
import { uniques } from "../core/items/uniques";

const uniqueCharms = Object.values(uniques.charm);
const magicCharms: Item[] = [];
const charmList: Item[] = [...uniqueCharms, ...magicCharms];
</script>

<template>
	<div class="container">
		<img class="inventory" src="../assets/charm_inventory.png" alt="" />
		<div class="charm-list">
			<div class="item-listing" v-for="entry in charmList">
				<p
					:class="{
						[entry.rarity]: true,
					}"
				>
					{{ entry.name }}, {{ entry.baseName }}
				</p>
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
