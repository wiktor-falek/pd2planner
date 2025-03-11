<script setup lang="ts">
import { computed } from "vue";
import { attributeInfo } from "../data/attributes";
import { useCharacterStore, type Attribute } from "../stores/characterStore";

const characterStore = useCharacterStore();

const attributes = computed(() => attributeInfo[characterStore.characterClass]);


function handleMouseDown(event: MouseEvent, attribute: Attribute) {
  if (event.button === 0) {
    characterStore.allocateAttribute(attribute, 1);
  } else if (event.button === 2) {
    characterStore.deallocateAttribute(attribute, 1);
  }
}

</script>

<template>
  <div class="attributes">
    <div class="attribute">
      <label>Strength: {{ attributes.strength.base + characterStore.attributes.strength }}</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'strength')">+</button>
    </div>
    <div class="attribute">
      <label>Dexterity: {{ attributes.dexterity.base + characterStore.attributes.dexterity }}</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'dexterity')">+</button>
    </div>
    <div class="attribute">
      <label>Vitality: {{ attributes.vitality.base + characterStore.attributes.vitality }}</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'vitality')">+</button>
    </div>
    <div class="attribute">
      <label>Energy: {{ attributes.energy.base + characterStore.attributes.energy }}</label>
      <button class="attribute-button" @mousedown="handleMouseDown($event, 'energy')">+</button>
    </div>
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
  width: 180px;
  justify-content: space-between;
}

.attribute-button {
  padding: 0;
  width: 32px;
  height: 32px;
}
</style>