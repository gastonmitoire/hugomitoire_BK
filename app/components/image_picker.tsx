import React from "react";

import { Image } from "@prisma/client";

interface ImagePickerProps {
  images?: Image[];
  selectedImage?: string;
  setSelectedImage?: React.Dispatch<React.SetStateAction<string>>;
}

export function ImagePicker({
  images,
  selectedImage,
  setSelectedImage,
}: ImagePickerProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage && setSelectedImage(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        {images?.map((image) => (
          <label key={image.id}>
            <input
              type="radio"
              name="image"
              value={image.url}
              checked={selectedImage === image.url}
              onChange={handleChange}
            />
            <img src={image.url} alt={image.filename} className="h-24" />
          </label>
        ))}
      </div>
    </div>
  );
}
