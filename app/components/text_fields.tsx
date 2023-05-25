import { Text } from "@prisma/client";
import React from "react";

interface TextFieldsProps {
  text?: Text;
  chapterId: string;
}

export function TextFields({ text, chapterId }: TextFieldsProps) {
  return (
    <div className="grid gap-5">
      <input type="hidden" name="content" value={""} />

      <input type="hidden" name="chapterId" value={chapterId} />
    </div>
  );
}
