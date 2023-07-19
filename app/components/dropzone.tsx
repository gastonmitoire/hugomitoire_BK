// custom dropzone component

import React, { useCallback, useMemo, useState } from "react";

interface DropzoneProps {
  name: string;
  id: string;
  defaultValue?: string;
  allowMultiple?: boolean;
  height?: number;
  label: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  name,
  id,
  defaultValue,
  allowMultiple = false,
  height,
  label,
}) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (!files) return;

    setPreview(URL.createObjectURL(files[0]));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setPreview(URL.createObjectURL(files[0]));
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleClear = useCallback(() => {
    setDragging(false);
    setPreview(null);
  }, []);

  return (
    <div>
      <label htmlFor={id} className="text-sm text-gray-500">
        {label}
      </label>
      <div
        className={
          `flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4` +
          (dragging ? " bg-gray-100" : "") +
          (preview ? " bg-contain bg-center bg-no-repeat" : "")
        }
        style={{
          minHeight: height ? `${height}px` : undefined,
          backgroundImage: preview ? `url(${preview})` : undefined,
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name={name}
          id={id}
          className="sr-only"
          onChange={handleFileChange}
          multiple={allowMultiple}
        />

        {!preview && (
          <p className="text-sm text-gray-500">
            Arrastra y suelta un archivo aquí o{" "}
            <label htmlFor={id} className="text-blue-500 cursor-pointer">
              haz clic para seleccionar uno
            </label>
            .
          </p>
        )}

        {defaultValue && (
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={defaultValue}
            alt="Preview"
          />
        )}
      </div>
      {preview && (
        <button
          type="button"
          className="text-sm text-red-500 cursor-pointer"
          onClick={handleClear}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};
