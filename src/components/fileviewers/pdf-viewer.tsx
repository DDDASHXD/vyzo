import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { iFileviewerProps } from "./fileviewer";
import Topbar from "./topbar";
import downloadFile from "./downloadFile";

const PdfViewer = ({ fullscreen, setFullscreen }: iFileviewerProps) => {
  const { currentFile } = React.useContext(ApplicationContext);

  return (
    <div className="flex flex-col w-full h-full">
      <iframe src={currentFile?.url!} className="w-full h-full" />
    </div>
  );
};

export default PdfViewer;
