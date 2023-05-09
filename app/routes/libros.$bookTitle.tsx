import React from "react";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";

import { db } from "~/utils/db.server";

function BookByTitle() {
  return <div>oliwis</div>;
}

export default BookByTitle;
