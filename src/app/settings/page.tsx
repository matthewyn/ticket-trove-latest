"use client";

import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { updateUser } from "@/actions/settings";
import SettingsLayout from "@/components/settings-layout";
import SubmitButton from "@/components/submit-button";
import { CircularProgress, Input } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";

export default function Settings() {
  const [formState, action] = useFormState(updateUser, { errors: {}, completed: false });
  const session = useSession();

  if (session.status === "loading")
    return (
      <div className="w-full absolute h-[calc(100vh-64px)] z-50 backdrop-blur-md flex items-center justify-center">
        <CircularProgress aria-label="Loading..." />
      </div>
    );

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    action(formData);
  };

  if (formState.completed) {
    toast.success("Success updating profile");
  }

  return (
    <SettingsLayout>
      <form className="flex flex-col gap-8" onSubmit={handleForm}>
        <Input
          label="Name"
          name="name"
          variant="bordered"
          labelPlacement="outside"
          defaultValue={session.data?.user.name || ""}
          placeholder="Enter your name"
          isInvalid={!!formState.errors.name}
          errorMessage={formState.errors.name}
          isRequired
        />
        <Input
          label="Email"
          name="email"
          variant="bordered"
          labelPlacement="outside"
          defaultValue={session.data?.user?.email || ""}
          placeholder="Enter your email"
          isInvalid={!!formState.errors.email}
          errorMessage={formState.errors.email}
          isRequired
        />
        <div className="text-end">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </SettingsLayout>
  );
}
