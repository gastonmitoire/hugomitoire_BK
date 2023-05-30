import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

import EditorJsRenderer from "~/components/editorjs_renderer";

export const loader = async ({ params }: LoaderArgs) => {
  const { bookTitle, chapterId } = params;
  const chapters = await db.chapter.findMany({});
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
    },
    include: {
      text: {
        select: {
          content: true,
        },
      },
      book: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!chapter) {
    return json({ content: "Chapter not found" }, { status: 404 });
  }

  return json({ chapter });
};

export default function () {
  const { chapter } = useLoaderData();

  console.log(chapter);

  return (
    <div className="relative h-screen text-neutral-950 bg-neutral-800">
      <button
        className="absolute top-0 right-0 z-20 p-5"
        onClick={() => history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 stroke-neutral-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="container mx-auto h-[99%] w-3/5 py-10 px-20 shadow-lg overflow-auto custom-scrollbar font-bellefair text-2xl bg-neutral-100">
        <h1 className="text-4xl font-bold text-center py-10">
          {chapter.title} - {chapter.book.title}
        </h1>
        {/* {chapter.text.length > 0 &&
          chapter.text.map((text: any) => (
            <div key={text.id} className="py-5">
              <EditorJsRenderer data={JSON.parse(text.content)} />
            </div>
          ))} */}
      </div>
    </div>
  );
}
