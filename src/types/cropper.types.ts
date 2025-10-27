export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropperConfig {
  minSelectionSize: number;
  maxImageSize: number;
  allowedFileTypes: string[];
}

export interface CropResult {
  selection: Rect;
  imageUrl: string;
  timestamp: number;
}

export const CropperErrorType = {
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  NO_FILE_SELECTED: 'NO_FILE_SELECTED',
  INVALID_SELECTION: 'INVALID_SELECTION',
} as const;

export type CropperErrorType = typeof CropperErrorType[keyof typeof CropperErrorType];

export interface CropperError {
  type: CropperErrorType;
  message: string;
}

export function createCropperError(type: CropperErrorType, message: string): CropperError {
  return { type, message };
}
