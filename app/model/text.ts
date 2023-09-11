import { db } from "~/services/db.server";
import { DepartmentType } from "./data/actions";

const databases: Record<string, any> = {
  bo_en: db.bO_EN_Text,
  en_bo: db.eN_BO_Text,
};

export async function uploadDataIfNotExist({
  name,
  department,
  data,
}: {
  name: string;
  department: DepartmentType;
  data: string[];
}) {
  let database = databases[department];
  if (!database) return { error: "Invalid department" };

  const existingRecord = await database.findFirst({
    where: {
      name,
    },
  });
  if (!!existingRecord) return { error: "Record already exists" };

  let UploadData = data.map((item) => ({ original_text: item, name }));
  try {
    let res = await database.createMany({
      data: UploadData,
    });
    return res;
  } catch (e) {
    throw new Error("Error in uploading data" + e);
  }
}

export async function getData(department: DepartmentType) {
  let database = databases[department];
  try {
    return await database?.findMany({
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  } catch (e) {
    throw new Error("Error in getting data" + e);
  }
}
