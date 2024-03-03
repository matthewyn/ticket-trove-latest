"use client";

import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { updateUser } from "@/actions/settings";
import SettingsLayout from "@/components/settings-layout";
import SubmitButton from "@/components/submit-button";
import { Input } from "@nextui-org/react";

export default function Settings() {
  const [formState, action] = useFormState(updateUser, { errors: {} });
  const session = useSession();

  if (session.status === "loading") return null;

  return (
    <SettingsLayout>
      <form action={action} className="flex flex-col gap-8">
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
