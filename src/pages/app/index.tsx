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
import Search from "@/components/ui/search";
import { getSettings, setSettings } from "@/lib/settings";

const Index = () => {
  const [defaultSize, setDefaultSize] = React.useState(20);
  const { getUser, currentFile, setCurrentFile, setCurrentFolder } =
    React.useContext(ApplicationContext);
  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    let settings = getSettings();

    if (settings) {
      setDefaultSize(settings.layout.horizontalSize);

      if (settings.persistence && settings.persistence.file) {
        setCurrentFolder(settings.persistence.file.parent);
        setTimeout(() => {
          //@ts-ignore
          setCurrentFile(settings.persistence.file);
        }, 50);
        return;
      }

      if (settings.persistence && settings.persistence.folder) {
        setCurrentFolder(settings.persistence.folder);
        return;
      }
    }
  }, []);

  const handleHorizontalResize = (e: number) => {
    if (currentFile) {
      console.log(e);
      let settings = getSettings();
      if (settings) {
        setDefaultSize(e);
        settings.layout.horizontalSize = e;
        setSettings(settings);
      }
    }
  };

  return (
    <div className="w-full flex flex-col h-screen bg-muted">
      <Search />
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
            defaultSize={currentFile ? defaultSize : 100}
            onResize={(e) => handleHorizontalResize(e)}
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
