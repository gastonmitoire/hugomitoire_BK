import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

export const loader = async ({ request }: { request: Request }) => {
  const images = await db.image.findMany({
    orderBy: { createdAt: "desc" },
  });
  return json({ images });
};

export default function AdminImagesRoute() {
  const data = useLoaderData();

  console.log("DATA", data);

  return (
    <div>
      <h1>Imágenes</h1>
      <Form
        method="post"
        encType="multipart/form-data"
        action="/admin/images/new"
      >
        <label>
          <span>Archivo:</span>
          <input type="file" name="file" />
        </label>
        <button type="submit">Subir</button>
      </Form>
      <ul>
        {data.images.map((image: any) => (
          <li key={image.filename}>
            <img src={image.url} alt={image.filename} className="h-20 w-20" />
          </li>
        ))}
      </ul>
    </div>
  );
}
