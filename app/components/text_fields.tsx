import { Suspense, lazy } from "react";

import { Text } from "@prisma/client";

interface TextFieldsProps {
  text?: Text;
  chapterId: string;
}

export function TextFields({ text, chapterId }: TextFieldsProps) {
  const EditorBlock = lazy(() => import("./editor"));
  return (
    <div className="grid gap-5">
      <Suspense fallback={<div>Loading...</div>}>
        <EditorBlock
          onChange={(val) => {
            console.log(val);
          }}
          holder="editor"
        />
      </Suspense>
      <input type="hidden" name="content" value={""} />

      <input type="hidden" name="chapterId" value={chapterId} />
    </div>
  );
}
