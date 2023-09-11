import { db } from "~/services/db.server";

export async function getUser(session: string) {
  try {
    return await db.user.findUnique({
      where: { username: session },
    });
  } catch (e) {
    throw new Error("Error in getting data" + e);
  }
}
export const createUserIfNotExists = async (username: string) => {
  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (existingUser) {
    return existingUser;
  }
  const newUser = await db.user.create({
    data: {
      username,
      nickname: username.split("@")[0],
    },
  });

  return newUser;
};
