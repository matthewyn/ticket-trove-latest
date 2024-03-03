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
    };
  const result = Setting.safeParse({
    bio: formData.get("bio"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await db.user.update({ where: { email: session.user.email }, data: { bio: result.data.bio } });
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
  revalidatePath(paths.profile());
  return {
    errors: {},
  };
}
