<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);

function handleClose(e: Event) {
	emit("close");
}
</script>

<template>
	<Teleport to="body">
		<div class="modal-overlay" @click="handleClose" v-show="props.isOpen">
			<div @click.stop>
				<slot></slot>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
.modal-overlay {
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgb(0, 0, 0, 0.75);
	z-index: 1000;
}
</style>
