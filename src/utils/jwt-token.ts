"use server";

import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ErrorTokenProps {
  errors: {
    _auth?: string[];
  };
}

export async function sendToken(user: User) {
  const token = jwt.sign({ currentUser: user }, process.env.JWT_SECRET_KEY!);
  cookies().set("jwt", token);
}

export async function getToken(key: string) {
  const cookie = cookies().get(key)?.value;
  return cookie;
}

export async function deleteToken(key: string) {
  cookies().delete(key);
}

export async function decodeToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
}
