"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { string, z } from "zod";

interface SignUpFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

const Signup = z.object({
  name: string().min(1),
  email: string().min(1).email(),
  password: string().trim().min(8),
});

export async function signup(formState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const result = Signup.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
      },
    });
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
          _form: ["Something bad happen"],
        },
      };
    }
  }
  redirect(paths.login());
}
