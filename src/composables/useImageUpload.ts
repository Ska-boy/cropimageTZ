import { ref, onUnmounted, type Ref } from 'vue';
import type { CropperError } from '@/types/cropper.types';
import { validateImageFile, createImageUrl, revokeImageUrl } from '@/utils/file.util';

export function useImageUpload() {
  const imageUrl: Ref<string | null> = ref(null);
  const error: Ref<CropperError | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  const handleFileChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    error.value = null;

    const validationError = validateImageFile(file);
    if (validationError) {
      error.value = validationError;
      return;
    }

    if (!file) return;

    isLoading.value = true;

    revokeImageUrl(imageUrl.value);

    imageUrl.value = createImageUrl(file);
    isLoading.value = false;
  };

  const clearImage = (): void => {
    revokeImageUrl(imageUrl.value);
    imageUrl.value = null;
    error.value = null;
  };

  onUnmounted(() => {
    revokeImageUrl(imageUrl.value);
  });

  return {
    imageUrl,
    error,
    isLoading,
    handleFileChange,
    clearImage,
  };
}
