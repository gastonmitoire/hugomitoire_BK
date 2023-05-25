import { useState, Suspense, lazy, ChangeEvent } from "react";
import { OutputData } from "@editorjs/editorjs";
import { Text } from "@prisma/client";

// @ts-expect-error
const EditorBlock = lazy(() => import("./editor"), {
  ssr: false,
});

interface TextFieldsProps {
  text?: Text;
  chapterId: string;
}

export function TextFields({ text, chapterId }: TextFieldsProps) {
  const [content, setContent] = useState<OutputData | undefined>();

  const handleContentChange = (newContent: OutputData) => {
    setContent(newContent);
  };

  console.log("content", JSON.stringify(content));

  return (
    <div className="grid gap-5">
      <Suspense fallback={<div>Loading...</div>}>
        <EditorBlock
          data={content}
          onChange={handleContentChange}
          holder="editor"
        />
      </Suspense>
      <input
        type="hidden"
        name="content"
        value={content ? JSON.stringify(content) : ""}
      />

      <input type="hidden" name="chapterId" value={chapterId} />
    </div>
  );
}
