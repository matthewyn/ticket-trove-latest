"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { string, z } from "zod";

interface UpdateGeneralFormState {
  errors: {
    name?: string[];
    email?: string[];
    _form?: string[];
  };
}

const Setting = z.object({
  name: string().min(1),
  email: string().min(1).email(),
});

export async function updateUser(formState: UpdateGeneralFormState, formData: FormData): Promise<UpdateGeneralFormState> {
  const session = await auth();
  if (!session?.user)
    return {
      errors: {
        _form: ["Log in to continue"],
      },
    };
  const result = Setting.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await db.user.update({ where: { email: session.user.email }, data: { email: result.data.email, name: result.data.name } });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something wrong happen"],
        },
      };
    }
  }
  revalidatePath(paths.settings());
  return {
    errors: {},
  };
}
