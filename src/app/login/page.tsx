import Image from "next/image";
import { Button } from "@nextui-org/react";
import login from "/public/login.jpg";
import google from "/public/google.png";
import { signIn } from "@/actions";

export default async function Login() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center">
        <div>
          <form action={signIn} className="flex flex-col text-center gap-4">
            <h1 className="text-4xl font-bold">Sign in</h1>
            <Button type="submit" color="primary" startContent={<Image src={google} alt="google logo" />}>
              Sign in with Google
            </Button>
            <Button type="submit" variant="ghost" startContent={<Image src={google} alt="google logo" />}>
              Sign up with Google
            </Button>
          </form>
        </div>
      </div>
      <div className="relative">
        <Image src={login} alt="A person enjoying a film" quality={80} fill objectFit="cover" />
      </div>
    </div>
  );
}
