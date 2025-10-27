import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';
import type { Point, Rect } from '@/types/cropper.types';
import { calculateRect, createEmptyRect, isValidRect } from '@/utils/coordinates.util';
import { DEFAULT_CROPPER_CONFIG } from '@/config/cropper.config';

export function useSelection() {
  const selection: Ref<Rect> = ref(createEmptyRect());
  const startPoint: Ref<Point | null> = ref(null);
  const isSelecting: Ref<boolean> = ref(false);

  const hasValidSelection = computed(() => 
    isValidRect(selection.value, DEFAULT_CROPPER_CONFIG.minSelectionSize)
  );

  const startSelection = (point: Point): void => {
    isSelecting.value = true;
    startPoint.value = point;
    selection.value = { ...point, width: 0, height: 0 };
  };

  const updateSelection = (point: Point): void => {
    if (!isSelecting.value || !startPoint.value) return;

    selection.value = calculateRect(startPoint.value, point);
  };

  const endSelection = (): Rect => {
    isSelecting.value = false;
    const finalSelection = { ...selection.value };
    
    if (hasValidSelection.value) {
      console.log('Selection completed:', finalSelection);
    }
    
    return finalSelection;
  };

  const clearSelection = (): void => {
    selection.value = createEmptyRect();
    startPoint.value = null;
    isSelecting.value = false;
  };

  const handlePointerUp = (): void => {
    if (isSelecting.value) {
      endSelection();
    }
  };

  onMounted(() => {
    window.addEventListener('pointerup', handlePointerUp);
  });

  onUnmounted(() => {
    window.removeEventListener('pointerup', handlePointerUp);
  });

  return {
    selection,
    isSelecting,
    hasValidSelection,
    startSelection,
    updateSelection,
    endSelection,
    clearSelection,
  };
}
