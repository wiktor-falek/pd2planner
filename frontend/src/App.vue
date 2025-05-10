<script setup lang="ts">
import { onMounted } from "vue";
import { useModalStore } from "./stores/modalStore";

const modalStore = useModalStore();

function handleEscKey(event: KeyboardEvent) {
	if (event.key === "Escape") {
		modalStore.close();
	}
}

onMounted(() => {
	window.addEventListener("keydown", handleEscKey);
});

</script>

<template>
	<RouterView></RouterView>
</template>
