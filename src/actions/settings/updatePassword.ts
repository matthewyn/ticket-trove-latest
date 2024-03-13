"use server";

import { auth } from "@/auth";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { string, z } from "zod";
import { db } from "@/db";
import { comparePassword, hashPassword } from "@/utils";

interface UpdatePasswordFormState {
  errors: {
    oldPassword?: string[];
    password?: string[];
    _form?: string[];
  };
  completed: boolean;
}

const Setting = z.object({
  oldPassword: string().trim().min(8),
  password: string().trim().min(8),
});

export async function updatePassword(formState: UpdatePasswordFormState, formData: FormData): Promise<UpdatePasswordFormState> {
  const session = await auth();
  if (!session?.user)
    return {
      errors: {
        _form: ["Log in to continue"],
      },
      completed: false,
    };
  const result = Setting.safeParse({
    oldPassword: formData.get("oldPassword"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      completed: false,
    };
  }
  try {
    const user = await db.user.findFirst({ where: { id: session.user.id } });
    if (!user) throw new Error("User not found");
    if (!(await comparePassword(result.data.oldPassword, user.password as string))) throw new Error("Password is invalid");
    const hashedPassword = await hashPassword(result.data.password);
    await db.user.update({ where: { id: user.id }, data: { password: hashedPassword } });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
        completed: false,
      };
    } else {
      return {
        errors: {
          _form: ["Something wrong happen"],
        },
        completed: false,
      };
    }
  }
  revalidatePath(paths.settingsPassword());
  return {
    errors: {},
    completed: true,
  };
}
