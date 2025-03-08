<script setup lang="ts">
import { attributeInfo } from "../data/attributes";
import { useCharacterStore } from "../stores/characterStore";

const characterStore = useCharacterStore();

const attributes = attributeInfo[characterStore.characterClass];

const strength = attributes.strength.base;
const dexterity = attributes.dexterity.base;
const vitality = attributes.vitality.base;
const energy = attributes.energy.base;
</script>

<template>
  <div></div>
</template>
