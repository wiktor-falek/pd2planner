<script setup lang="ts">
import SkillTree from "./components/SkillTree.vue";
import { useCharacterStore } from "./stores/characterStore";

const characterStore = useCharacterStore();
</script>

<template>
  <header>
    <select
      name="character-class"
      id="character-class"
      v-model="characterStore.characterClass"
    >
      <option value="amazon">Amazon</option>
      <option value="assassin">Assassin</option>
      <option value="necromancer">Necromancer</option>
      <option value="barbarian">Barbarian</option>
      <option value="paladin">Paladin</option>
      <option value="sorceress">Sorceress</option>
      <option value="druid">Druid</option>
    </select>

    <span>Level</span>
    <input
      id="character-level"
      type="number"
      min="1"
      max="99"
      v-model="characterStore.characterLevel"
    />
  </header>

  <div>
    <SkillTree></SkillTree>
  </div>
</template>

<style scoped></style>
