"use server";

import { db } from "@/db";
import { paths } from "@/paths";
import { generateResetToken, hashPassword, hashResetToken } from "@/utils";
import { Email } from "@/utils/email";
import { redirect } from "next/navigation";
import { string, z } from "zod";
import { headers } from "next/headers";

interface SignUpFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  completed: boolean;
}

interface ForgotPasswordFormState {
  errors: {
    email?: string[];
    _form?: string[];
  };
  completed: boolean;
}

interface ResetPasswordFormState {
  errors: {
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

const ForgotPassword = z.object({
  email: string().min(1).email(),
});

const ResetPassword = z.object({
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

export async function forgotPassword(formState: ForgotPasswordFormState, formData: FormData): Promise<ForgotPasswordFormState> {
  const header = headers();
  const origin = header.get("origin");
  const result = ForgotPassword.safeParse({
    email: formData.get("email"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      completed: false,
    };
  }
  try {
    const user = await db.user.findFirst({ where: { email: result.data.email } });
    if (!user) throw new Error("Email not registered");
    if (!user.password) throw new Error("Unsupported method");
    const token = generateResetToken();
    const hashedToken = hashResetToken(token);
    await db.user.update({ where: { id: user.id }, data: { resetToken: hashedToken } });
    await new Email().sendMail(result.data.email, "Your reset password token", `Please visit ${origin}/forgot-password/${token} to reset your password. If you didn't request to reset your password, please just ignore this email`);
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

export async function resetPassword(formState: ResetPasswordFormState, formData: FormData): Promise<ResetPasswordFormState> {
  const token = formData.get("token") as string;
  const result = ResetPassword.safeParse({
    password: formData.get("password"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      completed: false,
    };
  }
  try {
    const hashedToken = hashResetToken(token);
    const user = await db.user.findFirst({ where: { resetToken: hashedToken } });
    if (!user) throw new Error("Invalid token");
    const hashedPassword = await hashPassword(result.data.password);
    await db.user.update({ where: { id: user.id }, data: { resetToken: null, password: hashedPassword } });
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
