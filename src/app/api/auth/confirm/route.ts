import { db } from "@/db";
import { hashToken } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") as string;
    const hashedToken = hashToken(token);
    const user = await db.user.findFirst({ where: { confirmationToken: hashedToken } });
    if (!user) throw new Error("Token is invalid");
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("verified", "true");
    await db.user.update({ where: { id: user.id }, data: { emailVerified: new Date() } });
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Something bad happen" }, { status: 500 });
    }
  }
}
