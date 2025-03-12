<script setup lang="ts">
import { computed } from "vue";
import { attributeInfo } from "../data/attributes";
import { useAttributeStore, type Attribute } from "../stores/attributeStore";
import { useCharacterStore } from "../stores/characterStore";

const characterStore = useCharacterStore();
const attributeStore = useAttributeStore();

const attributes = computed(() => attributeInfo[characterStore.characterClass]);

function handleMouseDown(event: MouseEvent, attribute: Attribute) {
  if (event.button === 0) {
    attributeStore.allocateAttribute(attribute, 1);
  } else if (event.button === 2) {
    attributeStore.deallocateAttribute(attribute, 1);
  }
}

</script>

<template>
  <div class="attributes">
    <div class="attribute">
      <label>Strength: {{ attributes.strength.base + attributeStore.attributes.strength }} ({{
        attributeStore.attributes.strength }})</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'strength')">+</button>
    </div>
    <div class="attribute">
      <label>Dexterity: {{ attributes.dexterity.base + attributeStore.attributes.dexterity }} ({{
        attributeStore.attributes.dexterity }})</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'dexterity')">+</button>
    </div>
    <div class="attribute">
      <label>Vitality: {{ attributes.vitality.base + attributeStore.attributes.vitality }} ({{
        attributeStore.attributes.vitality }})</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'vitality')">+</button>
    </div>
    <div class="attribute">
      <label>Energy: {{ attributes.energy.base + attributeStore.attributes.energy }} ({{
        attributeStore.attributes.energy }})</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'energy')">+</button>
    </div>

    <p class="gray">Remaining: {{ attributeStore.unallocatedAttributePoints }}</p>
  </div>
</template>


<style scoped>
.attributes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attribute {
  display: flex;
  width: 220px;
  justify-content: space-between;
}

.attribute-button {
  padding: 0;
  width: 32px;
  height: 32px;
}
</style>