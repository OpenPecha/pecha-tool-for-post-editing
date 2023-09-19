import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { DepartmentType } from "~/model/data/actions";
import { getTextWithName, updateTranscriber } from "~/model/text";
import { getUsers } from "~/model/user";
import AboutText from "~/route_component/admin/AboutText";

export const loader: LoaderFunction = async ({ params, request }) => {
  let filename = params.filename as string;
  let users = await getUsers();
  let url = new URL(request.url);
  let session = url.searchParams.get("session");
  let department = params.department as DepartmentType;
  let texts = await getTextWithName(department, filename);
  return json({ texts, filename, users, department, session });
};

export const action: ActionFunction = async ({ request, params }) => {
  let formdata = await request.formData();

  switch (request.method) {
    case "PATCH": {
      let action = formdata.get("action") as string;
      switch (action) {
        case "change_transcriber": {
          let department = formdata.get("department") as DepartmentType;
          let name = formdata.get("text_name") as string;
          let transcriber = formdata.get("transcriber") as string;
          return await updateTranscriber(name, transcriber, department);
        }
      }
    }
  }
};

function AboutFile() {
  return <AboutText />;
}

export default AboutFile;
