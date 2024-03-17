"use client";

import { Input } from "@nextui-org/react";
import login from "/public/login.jpg";
import Hero from "@/components/hero";
import SubmitButton from "@/components/submit-button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { resetPassword } from "@/actions/users";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface ResetPasswordProps {
  params: {
    token: string;
  };
}

export default function ResetPassword({ params }: ResetPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [formState, action] = useFormState(resetPassword, { errors: {}, completed: false });

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (formState.errors._form) {
    toast.error(formState.errors._form.join(", "));
  }

  if (formState.completed) {
    toast.success("Password has been changed");
    router.push("/login");
  }

  return (
    <main>
      <Hero image={login} altImage="Person enjoying a film">
        <div className="mb-4 text-center flex flex-col gap-4 items-center">
          <h1 className="font-bold text-2xl">Reset password</h1>
          <p>Fill in the form below with your chosen password. Your new password will serve as a key to unlocking seamless access to your account.</p>
        </div>
        <form className="flex flex-col gap-4" action={action}>
          <Input
            type={isVisible ? "text" : "password"}
            label="New password"
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
          />
          <Input className="hidden" type="hidden" name="token" value={params.token} />
          <SubmitButton>Reset password</SubmitButton>
        </form>
      </Hero>
    </main>
  );
}
