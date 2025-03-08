<script setup lang="ts">
import { ref } from "vue";
import SkillTree from "./components/SkillTree.vue";
import Attributes from "./components/Attributes.vue";
import { useCharacterStore } from "./stores/characterStore";
import type { CharacterClass } from "./types";

const characterStore = useCharacterStore();

type Tab = "skill-tree" | "attributes";
const selectedTab = ref<Tab>("skill-tree");
</script>

<template>
  <div class="app" @contextmenu.prevent>
    <header>
      <select
        name="character-class"
        id="character-class"
        :value="characterStore.characterClass"
        @change="
          characterStore.setCharacterClass(
            ($event.target as HTMLSelectElement).value as CharacterClass
          )
        "
      >
        <option value="amazon">Amazon</option>
        <option value="assassin">Assassin</option>
        <option value="necromancer">Necromancer</option>
        <option value="barbarian">Barbarian</option>
        <option value="paladin">Paladin</option>
        <option value="sorceress">Sorceress</option>
        <option value="druid">Druid</option>
      </select>

      <div>
        <span>Level</span>
        <input
          id="character-level"
          type="number"
          min="1"
          max="99"
          :value="characterStore.characterLevel"
          @change="
            characterStore.setCharacterLevel(
              parseInt(($event.target as HTMLInputElement).value)
            )
          "
        />
      </div>

      <span>
        <span
          :class="{
            red:
              characterStore.allocatedPointsCount >
              characterStore.totalPointsCount,
          }"
          >{{ characterStore.allocatedPointsCount }}</span
        >
        <span>/</span>
        <span>{{ characterStore.totalPointsCount }}</span>
      </span>
    </header>

    <div>
      <SkillTree v-if="selectedTab === 'skill-tree'"></SkillTree>
      <Attributes v-else-if="selectedTab === 'attributes'"></Attributes>
    </div>
  </div>
</template>

<style scoped>
.app {
  user-select: none;
}

header {
  display: flex;
  gap: 10px;
}

.red {
  color: rgb(162, 58, 58);
}
</style>
