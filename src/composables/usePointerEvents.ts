import { ref, type Ref } from 'vue';
import type { Point } from '@/types/cropper.types';
import { getRelativePoint } from '@/utils/coordinates.util';

export function usePointerEvents(
  containerRef: Ref<HTMLElement | null>,
  onStart: (point: Point) => void,
  onMove: (point: Point) => void
) {
  const isDragging: Ref<boolean> = ref(false);

  const handlePointerDown = (event: PointerEvent): void => {
    if (!containerRef.value) return;

    const point = getRelativePoint(
      event.clientX,
      event.clientY,
      containerRef.value
    );

    isDragging.value = true;
    onStart(point);
  };

  const handlePointerMove = (event: PointerEvent): void => {
    if (!isDragging.value || !containerRef.value) return;

    const point = getRelativePoint(
      event.clientX,
      event.clientY,
      containerRef.value
    );

    onMove(point);
  };

  const handlePointerUp = (): void => {
    isDragging.value = false;
  };

  return {
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
