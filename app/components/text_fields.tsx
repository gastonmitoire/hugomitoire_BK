import React from "react";

import { Text } from "@prisma/client";

interface TextFieldsProps {
  text?: Text;
  chapterId: string;
}

export function TextFields({ text, chapterId }: TextFieldsProps) {
  return (
    <div className="grid gap-5">
      <label>
        <span className="block mb-2 text-sm font-medium text-neutral-300">
          Texto
        </span>
        <textarea
          className="block w-full p-3 text-lg text-neutral-700 bg-neutral-100 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
          name="content"
          defaultValue={text?.content || ""}
        />
      </label>

      <input type="hidden" name="chapterId" value={chapterId} />
    </div>
  );
}
