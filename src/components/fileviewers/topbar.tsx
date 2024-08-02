import React from "react";
import { Button } from "../ui/button";
import { Maximize2, Minimize2, Share, X } from "lucide-react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { iFile } from "@/hooks/useFiles";
import Link from "next/link";
import axios from "axios";
import TopbarButton from "./TopbarButton";

interface iTopbarProps {
  exportFunction?: any;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
  customExport?: any[];
}

const Topbar = ({
  exportFunction,
  fullscreen,
  setFullscreen,
  customExport,
}: iTopbarProps) => {
  const { setCurrentFile, currentFile } = React.useContext(ApplicationContext);

  return (
    <div className="bg-background border-b px-5 py-1 flex items-center justify-end gap-1">
      {customExport &&
        customExport.map((btn) => {
          return btn;
        })}
      {exportFunction && !customExport && (
        <TopbarButton
          variant={"ghost"}
          props={{
            onClick: () => exportFunction(),
          }}
        >
          <Share />
        </TopbarButton>
      )}
      <TopbarButton
        props={{
          onClick: () => setFullscreen(!fullscreen),
        }}
        variant={!fullscreen ? "ghost" : "secondary"}
      >
        {!fullscreen ? <Maximize2 /> : <Minimize2 />}
      </TopbarButton>
      <TopbarButton
        props={{
          /* @ts-ignore */
          onClick: () => setCurrentFile(null),
        }}
      >
        <X />
      </TopbarButton>
    </div>
  );
};

export default Topbar;
