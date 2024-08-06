import React from "react";
import { iFileviewerProps } from "./fileviewer";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { rotatePlugin } from "@react-pdf-viewer/rotate";

const PdfViewer = ({ fullscreen, setFullscreen }: iFileviewerProps) => {
  const { currentFile } = React.useContext(ApplicationContext);
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(5);

  // Plugins
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage } = pageNavigationPluginInstance;

  const rotatePluginInstance = rotatePlugin();

  const handleLoad = (e: any) => {
    setNumPages(e.doc._pdfInfo.numPages);
  };

  const handlePageChange = (e: any) => {
    setCurrentPage(e.currentPage);
  };

  React.useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="flex p-2 gap-1 rounded-lg absolute bottom-5 left-1/2 -translate-x-1/2 z-10 bg-background items-center border">
        <div className="flex gap-2 items-center text-sm">
          <p>Page</p>
          <div className="flex gap-1 items-center">
            <Button variant="ghost" className="p-1 size-7">
              <ChevronLeftIcon />
            </Button>
            <Input
              placeholder="Page"
              value={currentPage + 1}
              className={`border-none h-max p-1 w-6 text-center`}
            />

            <Button
              variant="ghost"
              className="p-1 size-7"
              onClick={() => jumpToNextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <p>of {numPages.toString()}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col overflow-scroll relative">
        {currentFile && (
          <div className="w-full max-w-screen-sm h-max mx-auto">
            <Viewer
              fileUrl={currentFile.url!}
              onPageChange={(e) => handlePageChange(e)}
              onDocumentLoad={(e) => handleLoad(e)}
              //initialPage={currentPage}
              plugins={[pageNavigationPluginInstance]}
            />
          </div>
        )}
      </div>
    </Worker>
  );
};

export default PdfViewer;
