<template>
  <div class="cropper">
    <div class="cropper__upload-section">
      <label class="cropper__upload-button">
        <input
          type="file"
          accept="image/*"
          class="cropper__file-input"
          @change="handleFileChange"
        />
        <span class="cropper__button-text">Загрузить картинку</span>
      </label>

      <div v-if="error" class="cropper__error">
        {{ error.message }}
      </div>
    </div>

    <div
      ref="viewEl"
      class="cropper__view"
      :class="{ 'cropper__view--has-image': !!imageUrl }"
      @pointerdown.prevent="handlePointerDown"
      @pointermove.prevent="handlePointerMove"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        ref="imgEl"
        class="cropper__image"
        alt="Uploaded image for cropping"
      />

      <div
        v-if="hasValidSelection"
        class="cropper__selection"
        :style="selectionStyle"
      />

      <div v-if="!imageUrl" class="cropper__empty-state">
        <p>Загрузите изображение для начала работы</p>
      </div>
    </div>

    <div v-if="hasValidSelection" class="cropper__info">
      <span class="cropper__info-label">Координаты:</span>
      <span class="cropper__info-value">
        X: {{ Math.round(selection.x) }}, Y: {{ Math.round(selection.y) }}
      </span>
      <span class="cropper__info-separator">|</span>
      <span class="cropper__info-label">Размер:</span>
      <span class="cropper__info-value">
        W: {{ Math.round(selection.width) }}, H:
        {{ Math.round(selection.height) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useImageUpload } from "@/composables/useImageUpload";
import { useSelection } from "@/composables/useSelection";
import { usePointerEvents } from "@/composables/usePointerEvents";

const viewEl = ref<HTMLElement | null>(null);
const imgEl = ref<HTMLImageElement | null>(null);

const { imageUrl, error, handleFileChange } = useImageUpload();

const { selection, hasValidSelection, startSelection, updateSelection } =
  useSelection();

const { handlePointerDown, handlePointerMove } = usePointerEvents(
  viewEl,
  (point) => {
    if (imageUrl.value) {
      startSelection(point);
    }
  },
  (point) => {
    updateSelection(point);
  }
);

const selectionStyle = computed(() => ({
  left: `${selection.value.x}px`,
  top: `${selection.value.y}px`,
  width: `${selection.value.width}px`,
  height: `${selection.value.height}px`,
}));
</script>

<style scoped>
.cropper {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 50rem;
}

.cropper__upload-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cropper__upload-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cropper__file-input {
  display: none;
}

.cropper__button-text {
  padding: 0.625rem 1rem;
  background: #41ffdc;
  color: #000;
  font-weight: 500;
  border-radius: 0.75rem;
  user-select: none;
  transition: 0.2s ease;
}

.cropper__button-text:hover {
  box-shadow: 0 4px 8px rgba(65, 255, 220, 0.3);
  background-color: rgb(71, 209, 184);
}

.cropper__error {
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.cropper__view {
  position: relative;
  width: 100%;
  min-height: 18.75rem;
  background-color: #282828;
  border: 2px dashed #4f4f4f;
  box-sizing: border-box;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.cropper__view--has-image {
  border-style: solid;
  border-color: #41ffdc;
}

.cropper__view:hover {
  border-color: #41ffdc;
}

.cropper__image {
  display: block;
  max-width: 100%;
  height: auto;
  user-select: none;
  pointer-events: none;
}

.cropper__selection {
  position: absolute;
  box-sizing: border-box;
  background: rgba(28, 150, 202, 0.3);
  border: 2px solid rgba(28, 150, 202, 0.8);
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.cropper__empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 70%;
  margin: 0 auto;
  min-height: 20rem;
  color: #9ca3af;
  font-size: 1rem;
  text-align: center;
}

.cropper__empty-state p {
  margin: 0;
}

.cropper__info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(65, 255, 220, 0.1);
  border: 1px solid rgba(65, 255, 220, 0.3);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: "Courier New", monospace;
}

.cropper__info-label {
  font-weight: 600;
  color: #41ffdc;
}

.cropper__info-value {
  color: #fff;
}

.cropper__info-separator {
  color: #6b7280;
  margin: 0 0.25rem;
}

@media (prefers-color-scheme: light) {
  .cropper__view {
    background: #f9fafb;
  }

  .cropper__info-value {
    color: #1f2937;
  }

  .cropper__empty-state {
    color: #6b7280;
  }
}
</style>
