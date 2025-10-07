<template>
  <div class="cropper">
    <label class="upload">
      <input type="file" accept="image/*" @change="onFileChange" />
      <span>Загрузить картинку</span>
    </label>

    <div
      class="view"
      ref="viewEl"
      @pointerdown.prevent="onPointerDown"
      @pointermove.prevent="onPointerMove"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        ref="imgEl"
        class="image"
        alt="Uploaded"
      />
      <div
        v-if="selection.width > 0 && selection.height > 0"
        class="selection"
        :style="{
          left: selection.x + 'px',
          top: selection.y + 'px',
          width: selection.width + 'px',
          height: selection.height + 'px',
        }"
      ></div>
    </div>

    <div v-if="selection.height && selection.width">
      x: {{ selection.x }}, y: x: {{ selection.y }} w: {{ selection.width }}, h:
      {{ selection.height }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};

const imageUrl = ref<string | null>(null);
const imgEl = ref<HTMLImageElement | null>(null);
const viewEl = ref<HTMLDivElement | null>(null);

const moveStart = ref<Point | null>(null);
const isMoving = ref(false);
const selection = ref<Rect>({ x: 0, y: 0, width: 0, height: 0 });

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];

  if (!file) return;

  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value);
  imageUrl.value = URL.createObjectURL(file);
}

function getRelativePoint(clientX: number, clientY: number) {
  if (!viewEl.value) return { x: 0, y: 0 };
  const rect = viewEl.value.getBoundingClientRect();

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return { x, y };
}

function onPointerDown(event: PointerEvent) {
  if (!imageUrl.value) return;
  const { x, y } = getRelativePoint(event.clientX, event.clientY);
  isMoving.value = true;

  moveStart.value = { x, y };
  selection.value.x = x;
  selection.value.y = y;
  selection.value.width = 0;
  selection.value.height = 0;
}

function onPointerMove(event: PointerEvent) {
  if (!isMoving.value || !moveStart.value) return;
  const { x, y } = getRelativePoint(event.clientX, event.clientY);

  selection.value.x = Math.min(moveStart.value.x, x);
  selection.value.y = Math.min(moveStart.value.y, y);
  selection.value.width = Math.abs(x - moveStart.value.x);
  selection.value.height = Math.abs(y - moveStart.value.y);
}

function onPointerUp() {
  if (!isMoving.value) return;
  isMoving.value = false;
  moveStart.value = null;

  console.log("Coords", { ...selection.value });
}

onMounted(() => {
  window.addEventListener("pointerup", onPointerUp);
});

onUnmounted(() => {
  window.removeEventListener("pointerup", onPointerUp);
});
</script>

<style scoped>
.cropper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload input[type="file"] {
  display: none;
}

.upload span {
  padding: 8px 12px;
  background: #41ffdc;
  color: black;
  cursor: pointer;
  border-radius: 12px;
}

.view {
  position: relative;
  width: 100%;
  max-width: 800px;
  min-height: 300px;
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 8px;
  overflow: hidden;
}

.image {
  max-width: 100%;
  height: auto;
}

.selection {
  position: absolute;
  box-sizing: border-box;
  background: rgba(28, 150, 202, 0.3);
}
</style>
