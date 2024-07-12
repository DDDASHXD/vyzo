import Editor from "@/components/ui/editor";
import FileBrowser from "@/components/ui/filebrowser";
import MenuBar from "@/components/ui/menu-bar";
import Sidebar from "@/components/ui/sidebar";
import React from "react";
import { ApplicationContext } from "@/providers/ApplicationProvider";

const Index = () => {
  const { getUser } = React.useContext(ApplicationContext);
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen bg-muted">
      <MenuBar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-col h-full w-full bg-background border-t border-t-border border-l border-l-border rounded-tl-3xl overflow-hidden">
          <FileBrowser />
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Index;
