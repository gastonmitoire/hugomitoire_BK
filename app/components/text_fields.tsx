import { Editable, useEditor } from "@wysimark/react";

import { Text } from "@prisma/client";
import React from "react";

interface TextFieldsProps {
  text?: Text;
  chapterId: string;
}

export function TextFields({ text, chapterId }: TextFieldsProps) {
  const editor = useEditor({
    initialMarkdown: "# Hello World\n\nLorem ipsum dolar.",
    height: 240,
    authToken: "my-auth-token",
  });

  const showMarkdown = (event: React.MouseEvent) => {
    event.preventDefault();
    alert(editor.getMarkdown());
  };

  return (
    <div className="grid gap-5">
      <Editable editor={editor} />
      <button onClick={showMarkdown}>Show Markdown</button>

      <input type="hidden" name="chapterId" value={chapterId} />
    </div>
  );
}
