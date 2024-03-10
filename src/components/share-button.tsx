"use client";

import { Button } from "@nextui-org/react";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";

interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button as={WhatsappShareButton} url={url} variant="ghost" radius="full" style={{ border: "1px solid#a1a1aa", paddingLeft: "1rem", paddingRight: "1rem" }} aria-label="Share whatsapp" startContent={<WhatsappIcon size={20} round />}>
        Share
      </Button>
      <Button as={FacebookShareButton} url={url} variant="ghost" radius="full" style={{ border: "1px solid#a1a1aa", paddingLeft: "1rem", paddingRight: "1rem" }} aria-label="Share facebook" startContent={<FacebookIcon size={20} round />}>
        Share
      </Button>
      <Button as={TwitterShareButton} url={url} variant="ghost" radius="full" style={{ border: "1px solid#a1a1aa", paddingLeft: "1rem", paddingRight: "1rem" }} aria-label="Share twitter" startContent={<TwitterIcon size={20} round />}>
        Share
      </Button>
    </div>
  );
}
