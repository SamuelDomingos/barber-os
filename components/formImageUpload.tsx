"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";

const FormImageUpload = ({
  preview,
  fileInputRef,
  onChange,
  name,
  variant = "avatar",
}: {
  preview: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  variant?: "avatar" | "card";
}) => {
  const handleClick = () => fileInputRef.current?.click();

  return (
    <div className="col-span-2 flex flex-col items-center gap-2">
      <div className="relative w-fit">
        {variant === "avatar" ? (
          <Avatar
            onClick={handleClick}
            className="w-24 h-24 rounded-lg cursor-pointer"
          >
            <AvatarImage src={preview ?? undefined} />
            <AvatarFallback className="rounded-lg bg-muted">
              <ImageIcon size={24} className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div
            onClick={handleClick}
            className="w-80 h-48 rounded-lg bg-muted flex items-center justify-center overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
                width={80}
                height={48}
              />
            ) : (
              <ImageIcon size={24} className="text-muted-foreground" />
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />

        <button
          type="button"
          onClick={handleClick}
          className="absolute right-0 bottom-0 w-8 h-8 flex items-center justify-center rounded-full bg-secondary border-4 border-background"
        >
          <Plus size={14} className="text-white" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        {name ? `Imagem de ${name}` : "Imagem opcional"}
      </p>
    </div>
  );
};

export default FormImageUpload;
