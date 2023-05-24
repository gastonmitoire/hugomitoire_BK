import React from "react";
import { Form } from "@remix-run/react";

import { Book, Image } from "@prisma/client";

import { ImagePicker } from "./image_picker";

interface BookFormProps {
  book?: Book;
  images?: Image[];
}

export function BookForm({ book, images }: BookFormProps) {
  const handleChange = (event: React.FormEvent) => {
    console.log(event.target);
  };

  return (
    <Form method="post" onChange={handleChange}>
      <div className="flex flex-col space-y-4">
        <span
          className="h-36 w-full bg-cover bg-center bg-no-repeat"
          style={{
            background: `url(${book?.secondaryImage})`,
          }}
        >
          <ImagePicker images={images} selectedImage={book?.secondaryImage} />
        </span>
        <input
          name="title"
          type="text"
          placeholder="Título"
          className="w-full p-3 bg-neutral-700 bg-opacity-10"
          defaultValue={book?.title || ""}
        />
      </div>
    </Form>
  );
}
