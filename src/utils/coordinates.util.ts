import type { Point, Rect } from '@/types/cropper.types';

export function getRelativePoint(
  clientX: number,
  clientY: number,
  element: HTMLElement
): Point {
  const rect = element.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

export function calculateRect(start: Point, end: Point): Rect {
  return {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  };
}

export function isValidRect(rect: Rect, minSize: number = 0): boolean {
  return rect.width >= minSize && rect.height >= minSize;
}

export function clampRect(
  rect: Rect,
  maxWidth: number,
  maxHeight: number
): Rect {
  return {
    x: Math.max(0, Math.min(rect.x, maxWidth - rect.width)),
    y: Math.max(0, Math.min(rect.y, maxHeight - rect.height)),
    width: Math.min(rect.width, maxWidth - rect.x),
    height: Math.min(rect.height, maxHeight - rect.y),
  };
}

export function createEmptyRect(): Rect {
  return { x: 0, y: 0, width: 0, height: 0 };
}
