"use server";

import { auth } from "@/auth";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { string, z } from "zod";
import { db } from "@/db";

interface UpdateProfileFormState {
  errors: {
    bio?: string[];
    _form?: string[];
  };
  completed: boolean;
}

const Setting = z.object({
  bio: string().min(1),
});

export async function updateProfile(formState: UpdateProfileFormState, formData: FormData): Promise<UpdateProfileFormState> {
  const session = await auth();
  if (!session?.user)
    return {
      errors: {
        _form: ["Log in to continue"],
      },
      completed: false,
    };
  const result = Setting.safeParse({
    bio: formData.get("bio"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      completed: false,
    };
  }
  try {
    await db.user.update({ where: { id: session.user.id }, data: { bio: result.data.bio } });
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
  revalidatePath(paths.profile());
  return {
    errors: {},
    completed: true,
  };
}
