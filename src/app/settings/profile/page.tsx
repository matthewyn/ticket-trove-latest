"use client";

import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/actions/settings/updateProfile";
import SettingsLayout from "@/components/settings-layout";
import SubmitButton from "@/components/submit-button";
import { Input, Textarea } from "@nextui-org/react";

export default function Profile() {
  const [formState, action] = useFormState(updateProfile, { errors: {} });
  const session = useSession();

  if (session.status === "loading") return null;

  return (
    <SettingsLayout>
      <form action={action} className="flex flex-col gap-8">
        <Textarea
          label="Bio"
          name="bio"
          variant="bordered"
          labelPlacement="outside"
          defaultValue={session.data?.user.bio || ""}
          placeholder="Enter your bio"
          isInvalid={!!formState.errors.bio}
          errorMessage={formState.errors.bio}
          description="Brief description for your profile."
        />
        <div className="text-end">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </SettingsLayout>
  );
}
