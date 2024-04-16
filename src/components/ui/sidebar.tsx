// @ts-nocheck
import React from "react";
import UserMenu from "./user-menu";
import { Button } from "./button";
import { File, FolderClosed, FolderOpen } from "lucide-react";

interface iFiles {
  name: string;
  icon: any;
  favorite?: boolean;
  active?: boolean;
}

interface iFolders {
  name: string;
  icon: any;
  favorite?: boolean;
  active?: boolean;
  subfolders?: iFolders[];
  files?: iFiles[];
}

export const structure = [
  {
    name: "Work",
    icon: FolderClosed,
    favorite: true,
  },
  {
    name: "School",
    icon: FolderClosed,
  },
  {
    name: "Getting Started",
    icon: FolderOpen,
    subfolders: [
      {
        name: "Documentation",
        icon: FolderOpen,
        subfolders: [
          {
            name: "Vyzo",
            icon: FolderOpen,
            active: true,
            files: [
              {
                name: "Editor",
                icon: File,
              },
              {
                name: "Commands",
                icon: File,
              },
              {
                name: "Searching",
                icon: File,
              },
              {
                name: "🚀 Welcome to Vyzo!",
                icon: File,
                active: true,
                favorite: true,
              },
              {
                name: "Organizing",
                icon: File,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Projects",
    icon: FolderClosed,
  },
  {
    name: "Braindump",
    icon: FolderClosed,
    favorite: true,
  },
];

const renderFolders = (folders, indent = 17) => {
  return folders.map((folder, index) => {
    return (
      <React.Fragment key={index}>
        <Button
          className="justify-start hover:bg-background/50"
          variant={folder.active ? "outline" : "ghost"}
          style={{ paddingLeft: `${indent}px` }}
        >
          <folder.icon />
          <span className="ml-2">{folder.name}</span>
        </Button>
        {folder.subfolders && renderFolders(folder.subfolders, indent + 15)}
      </React.Fragment>
    );
  });
};

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center min-w-80 h-full max-h-screen p-1 gap-10">
      <UserMenu />

      <div className="flex flex-col w-full">
        <p className="text-xs text-muted-foreground ml-3">Favorites</p>
        {/* Go through the whole structure and find all favorite folders and files */}
        {structure.map((folder, index) => {
          if (folder.favorite) {
            return (
              <Button className="justify-start" variant="ghost" key={index}>
                <folder.icon />
                <span className="ml-2">{folder.name}</span>
              </Button>
            );
          }
          if (folder.subfolders) {
            return folder.subfolders.map((subfolder, index) => {
              if (subfolder.favorite) {
                return (
                  <Button className="justify-start" variant="ghost" key={index}>
                    <subfolder.icon />
                    <span className="ml-2">{subfolder.name}</span>
                  </Button>
                );
              }
              if (subfolder.files) {
                return subfolder.files.map((file, index) => {
                  if (file.favorite) {
                    return (
                      <Button
                        className="justify-start"
                        variant="ghost"
                        key={index}
                      >
                        <file.icon />
                        <span className="ml-2">{file.name}</span>
                      </Button>
                    );
                  }
                });
              }
            });
          }
        })}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-xs text-muted-foreground ml-3">Your Library</p>
        {/* Go through the whole structure and find all folders and subfolders */}
        {renderFolders(structure)}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-xs text-muted-foreground ml-3">Tags</p>
        <Button className="justify-start h-max py-1" variant="ghost">
          <div className="flex w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="ml-2 text-muted-foreground">Tag 1</span>
        </Button>
        <Button className="justify-start h-max py-1" variant="ghost">
          <div className="flex w-2 h-2 rounded-full bg-yellow-500"></div>
          <span className="ml-2 text-muted-foreground">Tag 2</span>
        </Button>
        <Button className="justify-start h-max py-1" variant="ghost">
          <div className="flex w-2 h-2 rounded-full bg-green-500"></div>
          <span className="ml-2 text-muted-foreground">Tag 3</span>
        </Button>
        <Button className="justify-start h-max py-1" variant="ghost">
          <div className="flex w-2 h-2 rounded-full bg-red-500"></div>
          <span className="ml-2 text-muted-foreground">Tag 4</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
