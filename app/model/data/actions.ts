import { uploadDataIfNotExist } from "../text";

export type DepartmentType = "bo_en" | "en_bo";

type UploadDataType = {
  name: string;
  data: string[];
  department: DepartmentType;
};
export const uploadData = async ({
  name,
  data,
  department,
}: UploadDataType) => {
  let res = await uploadDataIfNotExist({ name, data, department });
  return res;
};
