import { Prisma, Role } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { db } from "~/services/db.server";

export async function getUser(session: string) {
  let condition: Prisma.User$accepted_boArgs<DefaultArgs> = {
    select: { id: true, translated: true },
    take: 20,
    orderBy: { id: "desc" },
  };
  try {
    return await db.user.findUnique({
      where: { username: session },
      include: {
        accepted_bo: condition,
        accepted_en: condition,
        rejected_bo: condition,
        rejected_en: condition,
      },
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
    include: {
      accepted_bo: {
        select: { name: true, translated: true },
        take: 10,
        orderBy: { id: "desc" },
      },
      accepted_en: {
        select: { name: true, translated: true },
        take: 10,
        orderBy: { id: "desc" },
      },
      reviewer: true,
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

export const removeUser = async (username: string) => {
  try {
    let user = await db.user.delete({
      where: {
        username,
      },
    });
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserReviewer = async (
  id: string,
  reviewer_name: string | null
) => {
  if (reviewer_name === null || reviewer_name === "") {
    let updatedUser = await db.user.update({
      where: { id },
      data: { reviewer_id: null },
    });
    return updatedUser;
  }
  try {
    let updatedUser = await db.user.update({
      where: { id },
      data: {
        reviewer: {
          connect: { username: reviewer_name },
        },
      },
    });
    return updatedUser;
  } catch (e) {
    throw new Error(e);
  }
};
