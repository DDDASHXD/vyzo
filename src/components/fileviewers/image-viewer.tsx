import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import Image from "next/image";
import { iFileviewerProps } from "./fileviewer";
import Topbar from "./topbar";
import Link from "next/link";
import downloadFile from "./downloadFile";

const ImageViewer = ({ fullscreen, setFullscreen }: iFileviewerProps) => {
  const { currentFile } = React.useContext(ApplicationContext);
  const linkRef = React.useRef<any>(null);

  const exportFunction = async () => {
    downloadFile(currentFile!, linkRef);
  };

  return (
    <div className="w-full h-full bg-background/10 backdrop-blur-md -z-10 flex flex-col">
      <Topbar
        exportFunction={() => exportFunction()}
        fullscreen={fullscreen}
        setFullscreen={(e) => setFullscreen(e)}
      />
      <Image
        width={0}
        height={0}
        className="w-full h-full object-contain"
        sizes="100vw"
        src={currentFile?.url!}
        alt={currentFile?.name!}
      />
      <Link
        href={currentFile?.url!}
        download={currentFile?.name}
        className="hidden"
        ref={linkRef}
      />
    </div>
  );
};

export default ImageViewer;
