"use client";

import { Input } from "@nextui-org/react";
import login from "/public/login.jpg";
import Hero from "@/components/hero";
import SubmitButton from "@/components/submit-button";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { forgotPassword } from "@/actions/users";

export default function ForgotPassword() {
  const [formState, action] = useFormState(forgotPassword, { errors: {}, completed: false });

  if (formState.errors._form) {
    toast.error(formState.errors._form.join(", "));
  }

  if (formState.completed) {
    toast.success("Token has been sent");
  }

  return (
    <main>
      <Hero image={login} altImage="Person enjoying a film">
        <div className="mb-4 text-center flex flex-col gap-4 items-center">
          <h1 className="font-bold text-2xl">Forgot password?</h1>
          <p>Enter the email address you used when you joined and we&apos;ll send you instructions to reset your password.</p>
        </div>
        <form className="flex flex-col gap-4" action={action}>
          <Input type="email" name="email" label="Email" labelPlacement="outside" placeholder="Enter your email" variant="bordered" isRequired isInvalid={!!formState.errors.email} errorMessage={formState.errors.email} />
          <SubmitButton>Send token</SubmitButton>
        </form>
      </Hero>
    </main>
  );
}
