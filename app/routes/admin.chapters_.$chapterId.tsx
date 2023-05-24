import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

import { Header } from "~/components/header";

export const loader = async ({ request, params }: LoaderArgs) => {
  const chapter = await db.chapter.findUnique({
    where: { id: params.chapterId },
    include: {
      book: {
        select: {
          title: true,
        },
      },
    },
  });
  if (!chapter) {
    return redirect("/admin/chapters");
  }

  return json({ chapter });
};

export default function () {
  const { chapter } = useLoaderData<typeof loader>();

  console.log(chapter);

  return (
    <div>
      <Header title={chapter.order + ". " + chapter.title}>
        <h5 className="py-3 text-2xl font-bold text-neutral-700">
          {chapter.book.title}
        </h5>
      </Header>
      <div className="flex flex-col items-center justify-center w-full h-full"></div>
    </div>
  );
}
