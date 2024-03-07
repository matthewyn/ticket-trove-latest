"use client";

import Image from "next/image";
import { Button, Input, Link } from "@nextui-org/react";
import { FormEventHandler, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import login from "/public/login.jpg";
import google from "/public/google.png";
import Hero from "@/components/hero";
import SubmitButton from "@/components/submit-button";
import { signInGoogle } from "@/actions";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleForm: FormEventHandler = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", { email: email, password: password, redirect: false });
    if (res?.error === "CredentialsSignin") {
      return toast.error("Invalid credential");
    }
    router.push(paths.home());
  };

  return (
    <main>
      <Hero image={login} altImage="Person enjoying a film">
        <form action={signInGoogle} className="mb-4 text-center flex flex-col gap-4 items-center">
          <h1 className="font-bold text-2xl">Sign in to Ticket Trove</h1>
          <Button type="submit" variant="bordered" startContent={<Image src={google} alt="google logo" />}>
            Sign in with Google
          </Button>
        </form>
        <form className="flex flex-col gap-4" onSubmit={handleForm}>
          <Input type="email" name="email" label="Email" labelPlacement="outside" placeholder="Enter your email" variant="bordered" isRequired value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
            name="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            variant="bordered"
            isRequired
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" /> : <HiEye className="text-2xl text-default-400 pointer-events-none" />}
              </button>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton>Log in</SubmitButton>
        </form>
        <span>
          Don&apos;t have an account?
          <Link href="/signup" underline="always">
            {" "}
            Sign up
          </Link>
        </span>
      </Hero>
    </main>
  );
}
