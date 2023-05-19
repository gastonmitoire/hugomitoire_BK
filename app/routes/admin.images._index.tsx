import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const file = form.get("file");
  if (!file) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "No se ha proporcionado ningún archivo",
    });
  }

  const uploadedFile = file as File;
  const fileName = uploadedFile.name;
  const fileExtension = path.extname(fileName); // Obtener la extensión del archivo original
  const fileNameWithoutExtension = path.basename(fileName, fileExtension);
  const webpFileName = `${fileNameWithoutExtension}.webp`; // Nombre del archivo con extensión WebP
  const filePath = path.join("public", "images", webpFileName); // Ruta del archivo WebP
  const fileUrl = `/images/${webpFileName}`; // URL del archivo WebP

  try {
    // Obtener los datos binarios del archivo
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    // Utilizar sharp para convertir la imagen a WebP y guardarla
    await sharp(fileContent).webp().toFile(filePath);

    // Guardar la referencia de la URL de la imagen en la base de datos utilizando Prisma
    const image = await db.image.create({
      data: {
        filename: webpFileName, // Guardar el nombre del archivo con extensión WebP
        url: fileUrl,
      },
    });

    return redirect("/admin/images");
  } catch (error) {
    console.error("Error al guardar el archivo:", error);
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Error al guardar el archivo",
    });
  }
};

export const loader = async ({ request }: { request: Request }) => {
  const images = await db.image.findMany({
    orderBy: { createdAt: "desc" },
  });
  return json({ images });
};

export default function AdminImagesRoute() {
  const data = useLoaderData();
  const actionData = useActionData();

  console.log("DATA", data);

  return (
    <div>
      <h1>Imágenes</h1>
      <Form method="post" encType="multipart/form-data">
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
