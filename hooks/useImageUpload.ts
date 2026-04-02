"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";

const useImageUpload = <T extends FieldValues>({
  form,
  fieldName,
  initialUrl,
}: {
  form: { setValue: UseFormSetValue<T> };
  fieldName: Path<T>;
  initialUrl?: string | null;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialUrl ?? null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
    form.setValue(fieldName, file as never);
  };

  const clearImage = () => {
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    form.setValue(fieldName, undefined as never);
  };

  const resetPreview = (url: string | null) => {
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(url);
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return {
    fileInputRef,
    imagePreview,
    handleImageChange,
    clearImage,
    resetPreview,
  };
};

export default useImageUpload;