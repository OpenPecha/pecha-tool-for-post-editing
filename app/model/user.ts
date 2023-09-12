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

export const getUsers = async () => {
  const users = await db.user.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return users;
};

export async function updateUserRole(id: string, role: Role) {
  let item = await db.user.update({
    where: { id },
    data: { role },
  });
  return item;
}
export const updateUserAssign = async (id: string, allow: boolean) => {
  try {
    let user = await db.user.update({
      where: {
        id,
      },
      data: {
        isActive: allow,
      },
    });
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserNickname = async (id: string, name: string) => {
  try {
    let user = await db.user.update({
      where: {
        id,
      },
      data: {
        nickname: name,
      },
    });
    return user;
  } catch (e) {
    throw new Error(e);
  }
};
