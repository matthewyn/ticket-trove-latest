"use client";

import Image from "next/image";
import { Button, Input, Link } from "@nextui-org/react";
import React, { FormEventHandler, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import login from "/public/login.jpg";
import google from "/public/google.png";
import Hero from "@/components/hero";
import { useFormState } from "react-dom";
import { signup } from "@/actions/users";
import SubmitButton from "@/components/submit-button";
import { signInGoogle } from "@/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export default function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, action] = useFormState(signup, { errors: {}, completed: false });
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (formState.errors._form) {
    toast.error(formState.errors._form.join(", "));
  }

  if (formState.completed) {
    toast.success("Confirm your email to continue");
    router.push(paths.login());
  }

  return (
    <main>
      <Hero image={login} altImage="Person enjoying a film">
        <form action={signInGoogle} className="mb-4 text-center flex flex-col gap-4 items-center">
          <h1 className="font-bold text-2xl">Sign up to Ticket Trove</h1>
          <Button type="submit" variant="bordered" startContent={<Image src={google} alt="google logo" />}>
            Sign up with Google
          </Button>
        </form>
        <form className="flex flex-col gap-4" action={action}>
          <Input label="Name" name="name" labelPlacement="outside" placeholder="Enter your name" variant="bordered" isRequired isInvalid={!!formState.errors.name} errorMessage={formState.errors.name} />
          <Input type="email" name="email" label="Email" labelPlacement="outside" placeholder="Enter your email" variant="bordered" isRequired isInvalid={!!formState.errors.email} errorMessage={formState.errors.email} />
          <Input
            type={isVisible ? "text" : "password"}
            name="password"
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            variant="bordered"
            isRequired
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" /> : <HiEye className="text-2xl text-default-400 pointer-events-none" />}
              </button>
            }
            isInvalid={!!formState.errors.password}
            errorMessage={formState.errors.password}
          />
          <SubmitButton>Sign up</SubmitButton>
        </form>
        <span>
          Already have an account?
          <Link href="/login" underline="always">
            {" "}
            Log in
          </Link>
        </span>
      </Hero>
    </main>
  );
}
