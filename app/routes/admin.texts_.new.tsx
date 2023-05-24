import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

function validateContent(content: string) {
  if (content.length === 0) {
    return "El contenido es requerido.";
  }
}

export const action = async ({ request, params }: ActionArgs) => {
  const referer = request.headers.get("Referer");
  const form = await request.formData();
  const content = form.get("content");
  const chapterId = form.get("chapterId");

  if (typeof content !== "string" || typeof chapterId !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fields = {
    content,
    chapterId,
  };

  await db.text.create({
    data: fields,
  });

  return redirect(referer ?? `/admin/chapters/${chapterId}`);
};
