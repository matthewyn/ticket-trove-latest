"use client";

import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import SettingsLayout from "@/components/settings-layout";
import SubmitButton from "@/components/submit-button";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { updatePassword } from "@/actions/settings/updatePassword";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function Profile() {
  const [formState, action] = useFormState(updatePassword, { errors: {}, completed: false });
  const [isVisibleOldPassword, setIsVisibleOldPassword] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const session = useSession();

  if (session.status === "loading") return null;

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    action(formData);
  };

  if (formState.completed) {
    toast.success("Success updating password");
  } else if (formState.errors._form) {
    toast.error(formState.errors._form.join(", "));
  }

  return (
    <SettingsLayout>
      <form className="flex flex-col gap-8" onSubmit={handleForm}>
        <Input
          label="Old password"
          name="oldPassword"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your old password"
          isInvalid={!!formState.errors.oldPassword}
          errorMessage={formState.errors.oldPassword}
          type={isVisibleOldPassword ? "text" : "password"}
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => setIsVisibleOldPassword(!isVisibleOldPassword)}>
              {isVisibleOldPassword ? <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" /> : <HiEye className="text-2xl text-default-400 pointer-events-none" />}
            </button>
          }
        />
        <Input
          label="Password"
          name="password"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your password"
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password}
          type={isVisiblePassword ? "text" : "password"}
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => setIsVisiblePassword(!isVisiblePassword)}>
              {isVisiblePassword ? <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" /> : <HiEye className="text-2xl text-default-400 pointer-events-none" />}
            </button>
          }
        />
        <div className="text-end">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </SettingsLayout>
  );
}
