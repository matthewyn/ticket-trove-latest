"use client";

import { Chip, VisuallyHidden, tv, useCheckbox } from "@nextui-org/react";
import React from "react";

const checkbox = tv({
  slots: {
    base: "border-default bg-default-100 hover:bg-default-200 w-12 h-12 rounded-small border-medium max-w-full",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export default function CustomCheckbox(props: any) {
  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
      >
        {children}
      </Chip>
    </label>
  );
}
