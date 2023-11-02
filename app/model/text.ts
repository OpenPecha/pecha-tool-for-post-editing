import { db } from "~/services/db.server";
import { DepartmentType } from "./data/actions";
import { getUser } from "./user";

type databasesArg = {
  bo_en: typeof db.bO_EN_Text;
  en_bo: typeof db.eN_BO_Text;
};

const databases: databasesArg = {
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
  let database = databases[department] as typeof db.bO_EN_Text;
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
  let database = databases[department] as typeof db.eN_BO_Text;
  try {
    return await database?.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        transcriber: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (e) {
    throw new Error("Error in getting data" + e);
  }
}

export async function getText(department: DepartmentType, id: number) {
  let database = databases[department] as typeof db.eN_BO_Text;
  try {
    let data = await database?.findUnique({
      where: { id: id },
    });
    return data;
  } catch (e) {
    throw new Error("Error in getting data" + e);
  }
}

export async function deleteTextWithName(
  text_name: string,
  department: DepartmentType
) {
  let database = databases[department] as typeof db.eN_BO_Text;

  try {
    return await database.deleteMany({
      where: {
        name: text_name,
      },
    });
  } catch (e) {
    throw new Error("Error in deleting data" + e);
  }
}
export async function getTextWithName(
  department: DepartmentType,
  filename: string
) {
  let database = databases[department] as typeof db.eN_BO_Text;

  try {
    return await database.findMany({
      where: {
        name: filename,
      },
      include: {
        transcriber: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (e) {
    throw new Error("Error in getting data" + e);
  }
}
export async function updateTranscriber(
  text_name,
  transcriber,
  department: DepartmentType
) {
  let database = databases[department] as typeof db.eN_BO_Text;
  let user = await getUser(transcriber);
  try {
    return await database.updateMany({
      where: {
        name: text_name,
      },
      data: {
        transcriber_id: transcriber !== "" ? user?.id : null,
      },
    });
  } catch (e) {
    throw new Error("Error in updating data" + e);
  }
}

export async function getTextForUser(
  id: string,
  department: DepartmentType,
  history: string | null
) {
  if (history) {
    let database = databases[department] as typeof db.eN_BO_Text;
    const text = await database.findUnique({
      where: { id: parseInt(history) },
    });
    let show = text?.modified_text
      ? JSON.parse(text?.modified_text).join(" ")
      : text?.original_text;
    return {
      ...text,
      original_text: show,
    };
  }
  try {
    let database = databases[department] as typeof db.eN_BO_Text;
    let text = await database.findFirst({
      where: {
        transcriber_id: id,
        OR: [{ status: "PENDING" }, { status: "REJECTED" }, { status: null }],
      },
      orderBy: {
        id: "asc",
      },
    });
    // if text not available find a text that has no transcriber and assign it to the user

    if (!text) {
      text = await database.findFirst({
        where: {
          transcriber_id: null,
        },
        orderBy: {
          id: "asc",
        },
      });
      if (text) {
        await database.update({
          where: { id: text.id },
          data: {
            transcriber_id: id,
          },
        });
      }
    }
    return text;
  } catch (e) {
    throw new Error("Error in getting data" + e);
  }
}
export async function updateText(
  text_id: string,
  user_id: string,
  result: string,
  department: DepartmentType,
  duration: string
) {
  let database = databases[department] as typeof db.eN_BO_Text;
  try {
    let data = database.update({
      where: { id: parseInt(text_id) },
      data: {
        status: "APPROVED",
        translated: result,
        translated_by_id: user_id,
        duration: duration,
        rejected_by_id: null,
      },
    });
    return data;
  } catch (e) {
    throw new Error("Error in updating data" + e);
  }
}

export async function rejectText(id: string, department: DepartmentType) {
  try {
    let database = databases[department] as typeof db.eN_BO_Text;

    let text = await database.findFirst({ where: { id: parseInt(id) } });
    let userId = text?.translated_by_id as string;
    console.log("translator:", userId);
    let updated = await database.update({
      where: { id: parseInt(id) },
      data: {
        status: "REJECTED",
        translated_by_id: null,
        rejected_by_id: userId,
      },
    });

    return updated;
  } catch (e) {
    throw new Error("Error in updating data" + e);
  }
}

export async function updateTextFromReviewer(
  id: string,
  department: DepartmentType,
  content: string
) {
  try {
    let database = databases[department] as typeof db.eN_BO_Text;

    let text = await database.findFirst({ where: { id: parseInt(id) } });
    let userId = text?.translated_by_id as string;
    let updated = await database.update({
      where: { id: parseInt(id) },
      data: {
        status: "APPROVED",
        translated_by_id: userId,
        translated: content,
      },
    });
    return updated;
  } catch (e) {
    throw new Error("Error in updating data" + e);
  }
}
