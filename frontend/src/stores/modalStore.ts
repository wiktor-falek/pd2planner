import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useModalStore = defineStore("modal", () => {
	const _activeModalId = ref<string | null>(null);
	const activeModalId = computed(() => _activeModalId.value);
	const isOpen = computed(() => _activeModalId.value !== null);

	function open(id: string) {
		_activeModalId.value = id;
	}

	function close() {
		_activeModalId.value = null;
	}

	return {
		activeModalId,
		isOpen,
		open,
		close,
	};
});
