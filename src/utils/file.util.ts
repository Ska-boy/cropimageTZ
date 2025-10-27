import { CropperErrorType, createCropperError, type CropperError } from '@/types/cropper.types';
import { DEFAULT_CROPPER_CONFIG, VALIDATION_MESSAGES } from '@/config/cropper.config';

export function isValidFileType(
  file: File,
  allowedTypes: string[] = DEFAULT_CROPPER_CONFIG.allowedFileTypes
): boolean {
  return allowedTypes.includes(file.type);
}

export function isValidFileSize(
  file: File,
  maxSize: number = DEFAULT_CROPPER_CONFIG.maxImageSize
): boolean {
  return file.size <= maxSize;
}

export function validateImageFile(file: File | null | undefined): CropperError | null {
  if (!file) {
    return createCropperError(
      CropperErrorType.NO_FILE_SELECTED,
      VALIDATION_MESSAGES.NO_FILE_SELECTED
    );
  }

  if (!isValidFileType(file)) {
    return createCropperError(
      CropperErrorType.INVALID_FILE_TYPE,
      VALIDATION_MESSAGES.INVALID_FILE_TYPE
    );
  }

  if (!isValidFileSize(file)) {
    return createCropperError(
      CropperErrorType.FILE_TOO_LARGE,
      VALIDATION_MESSAGES.FILE_TOO_LARGE
    );
  }

  return null;
}

export function createImageUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeImageUrl(url: string | null): void {
  if (url) {
    URL.revokeObjectURL(url);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
