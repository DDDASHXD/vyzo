import Editor from "@/components/ui/editor";
import FileBrowser from "@/components/ui/filebrowser";
import MenuBar from "@/components/ui/menu-bar";
import Sidebar from "@/components/ui/sidebar";
import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileViewer from "@/components/fileviewers/fileviewer";
import { cn } from "@/lib/utils";

const Index = () => {
  const { getUser, currentFile } = React.useContext(ApplicationContext);
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen bg-muted">
      <MenuBar />
      <div className="flex h-full">
        <Sidebar />
        <ResizablePanelGroup
          direction="vertical"
          className="flex flex-col h-full w-full bg-background border-t border-t-border border-l border-l-border rounded-tl-3xl overflow-hidden"
        >
          <ResizablePanel
            className={cn("max-h-[500px]", {
              "max-h-full": !currentFile,
            })}
            defaultSize={currentFile ? 20 : 100}
            onResize={(e) => console.log(e)}
          >
            <FileBrowser />
          </ResizablePanel>
          <ResizableHandle />
          {currentFile && (
            <ResizablePanel>
              <FileViewer />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
