import { Editable, useEditor } from "@wysimark/react";

import { Text } from "@prisma/client";
import React from "react";

interface TextFieldsProps {
  text?: Text;
  chapterId: string;
}

export function TextFields({ text, chapterId }: TextFieldsProps) {
  const [editable, setEditable] = React.useState(false);
  const [content, setContent] = React.useState(
    "# Hello World\n\nLorem ipsum dolar."
  );
  const editor = useEditor({
    initialMarkdown: text?.content ?? content,
    height: 240,
    authToken: "my-auth-token",
  });

  console.log("editor ", editor.getMarkdown());

  return (
    <div className="grid gap-5">
      {editable ? (
        <Editable editor={editor} />
      ) : (
        <div>{text?.content ?? content}</div>
      )}
      <input type="hidden" name="content" value={content} />

      <input type="hidden" name="chapterId" value={chapterId} />
    </div>
  );
}
