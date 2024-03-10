"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { hashPassword } from "@/utils";
import { redirect } from "next/navigation";
import { string, z } from "zod";

interface SignUpFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  completed: boolean;
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
      completed: false,
    };
  }
  try {
    const user = await db.user.findFirst({ where: { email: result.data.email } });
    if (user) throw new Error("User already registered");
    const hashedPassword = await hashPassword(result.data.password);
    await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
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
          _form: ["Something bad happen"],
        },
        completed: false,
      };
    }
  }
  return {
    errors: {},
    completed: true,
  };
}
