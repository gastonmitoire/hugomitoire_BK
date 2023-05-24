import { useState } from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";

import { db } from "~/utils/db.server";

import { Button } from "~/components/button";
import { Header } from "~/components/header";
import { TextFields } from "~/components/text_fields";

export const loader = async ({ request, params }: LoaderArgs) => {
  const chapter = await db.chapter.findUnique({
    where: { id: params.chapterId },
    include: {
      text: true,
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

export default function AdminChapterById() {
  const { chapter } = useLoaderData<typeof loader>();
  const [creating, setCreating] = useState(false);

  const toggleCreating = () => setCreating((prev) => !prev);

  return (
    <div>
      <Header title={chapter.order + ". " + chapter.title}>
        <h5 className="py-3 text-2xl font-bold text-neutral-700">
          {chapter.book.title}
        </h5>
      </Header>
      <div className="flex flex-col items-center justify-center w-full h-full">
        {chapter.text.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 py-5">
            {chapter.text.map((text) => (
              <div
                key={text.id}
                className="flex flex-col items-center px-3 h-52 overflow-auto shadow shadow-neutral-800"
              >
                <p className="py-3 text-lg text-neutral-700">{text.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <span className="flex flex-col place-items-center gap-3 py-5">
            {creating ? (
              <Form
                action={`/admin/texts/new`}
                method="post"
                className="flex flex-col gap-3"
              >
                <TextFields chapterId={chapter.id} />

                <Button type="submit" size="large">
                  Crear texto
                </Button>
              </Form>
            ) : (
              "No hay texto para este capítulo."
            )}
            <Button
              color={creating ? "secondary" : "primary"}
              disableAnimation={creating}
              onClick={toggleCreating}
            >
              {creating ? "Cancelar" : "Crear texto"}
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}
