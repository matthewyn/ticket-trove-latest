import { db } from "@/db";
import { comparePassword } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) throw new Error("Complete form to continue");
    const user = await db.user.findFirst({
      where: { email },
    });
    if (!user || !(await comparePassword(password, user.password!))) throw new Error("Invalid credential");
    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Something bad happen" }, { status: 500 });
    }
  }
}
