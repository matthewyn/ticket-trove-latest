"use client";

import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/actions/settings/updateProfile";
import SettingsLayout from "@/components/settings-layout";
import SubmitButton from "@/components/submit-button";
import { Input, Textarea } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function Profile() {
  const [formState, action] = useFormState(updateProfile, { errors: {}, completed: false });
  const session = useSession();

  if (session.status === "loading") return null;

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
        <Input
          label="Location"
          name="location"
          variant="bordered"
          labelPlacement="outside"
          defaultValue={session.data?.user.location || ""}
          placeholder="Enter your location"
          isInvalid={!!formState.errors.location}
          errorMessage={formState.errors.location}
        />
        <div className="text-end">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </SettingsLayout>
  );
}
