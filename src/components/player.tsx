"use client";

import ReactPlayer from "react-player/youtube";

interface PlayerProps {
  mediaKey: string;
}

export default function Player({ mediaKey }: PlayerProps) {
  return <ReactPlayer url={`https://www.youtube.com/watch?v=${mediaKey}`} width="100%" height="100%" />;
}
