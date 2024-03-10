"use client";

import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Modal } from "@nextui-org/react";
import React from "react";

interface ModalProps {
  buttonLabel: string;
  title: string;
  children: React.ReactNode;
}

export default function ButtonModal({ buttonLabel, title, children }: ModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" radius="full">
        {buttonLabel}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
