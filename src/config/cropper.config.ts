import type { CropperConfig } from '@/types/cropper.types';

export const DEFAULT_CROPPER_CONFIG: CropperConfig = {
  minSelectionSize: 10,
  maxImageSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

export const UI_CONSTANTS = {
  SELECTION_OPACITY: 0.3,
  SELECTION_COLOR: 'rgba(28, 150, 202, 0.3)',
  BORDER_COLOR: '#d6d6d6',
  PRIMARY_COLOR: '#41ffdc',
} as const;

export const VALIDATION_MESSAGES = {
  INVALID_FILE_TYPE: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed size of 10MB',
  NO_FILE_SELECTED: 'No file was selected',
  INVALID_SELECTION: 'Selection area is too small',
} as const;
