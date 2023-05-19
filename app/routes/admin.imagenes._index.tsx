import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import path from "path";
import fs from "fs/promises";
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
  const filePath = path.join("public", "images", fileName);
  const fileUrl = `/images/${fileName}`;

  try {
    // Obtener los datos binarios del archivo
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    // Realizar la escritura del archivo según tu entorno de ejecución
    // Por ejemplo, si estás utilizando Node.js, puedes usar fs.writeFile
    fs.writeFile(filePath, fileContent);

    // Guardar la referencia de la URL de la imagen en la base de datos utilizando Prisma
    const image = await db.image.create({
      data: {
        filename: fileName,
        url: fileUrl,
      },
    });

    return redirect("/admin/imagenes");
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
        <Button type="submit">Subir</Button>
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
