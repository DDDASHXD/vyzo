import React from "react";
import Editor from "../ui/editor";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import SimpleFileViewer from "./simple-file-viewer";
import PdfViewer from "./pdf-viewer";
import { cn } from "@/lib/utils";
import { Maximize2, Minimize2, Share, X } from "lucide-react";
import { Button } from "../ui/button";
import ImageViewer from "./image-viewer";

export interface iFileviewerProps {
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
}

const FileViewer = () => {
  const { currentFile, setCurrentFile } = React.useContext(ApplicationContext);
  const [fullscreen, setFullscreen] = React.useState(false);

  const getFileViewer = () => {
    const props = {
      fullscreen,
      setFullscreen,
    };
    switch (currentFile?.fileType) {
      case "note":
        return <Editor {...props} />;
      case "application/pdf":
        return <PdfViewer {...props} />;
      case "image/jpeg":
      case "image/png":
        return <ImageViewer {...props} />;
      default:
        return <SimpleFileViewer {...props} />;
    }
  };

  return (
    <div
      className={cn("w-full h-full relative isolate", {
        "fixed top-0 left-0": fullscreen,
      })}
    >
      {/* <div className="absolute bottom-10 left-10 z-10">
        <Button
          className="p-0 size-10"
          onClick={() => setFullscreen(!fullscreen)}
          variant={"secondary"}
        >
          {!fullscreen ? <Maximize2 /> : <Minimize2 />}
        </Button>
      </div> */}

      {getFileViewer()}
    </div>
  );
};

export default FileViewer;
