"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface SubmitButtonProps {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}
