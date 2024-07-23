// @ts-nocheck
import React from "react";
import UserMenu from "./user-menu";
import { Button } from "./button";
import {
  File,
  FolderClosed,
  FolderOpen,
  FolderPlusIcon,
  PlusCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import Folder from "./folder";
import { Droppable } from "react-beautiful-dnd";

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

const Sidebar = () => {
  const [createFolder, setCreateFolder] = React.useState({
    active: false,
    name: "",
  });
  const createFolderRef = React.useRef(null);
  const { newFolder, folders, getFolders } =
    React.useContext(ApplicationContext);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = createFolder.name;
      createFolderRef.current.blur();

      console.log(value);
      newFolder(value, "/");
    }

    if (e.key === "Escape") {
      e.preventDefault();
      createFolderRef.current.blur();
    }
  };

  React.useEffect(() => {
    if (createFolder.active) {
      createFolderRef.current.focus();
    }
  }, [createFolder]);

  React.useEffect(() => {
    getFolders();
  }, []);
  return (
    <div className="flex flex-col items-center min-w-80 h-full max-h-screen p-1 gap-5">
      <UserMenu />

      <div className="flex flex-col w-full">
        <p className="text-xs text-muted-foreground ml-3 pr-4 flex w-full justify-between">
          Your Library
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PlusCircle
                  size={14}
                  className="cursor-pointer hover:text-foreground"
                  onClick={() =>
                    setCreateFolder({ ...createFolder, active: true })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>New folder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        {/* Go through the whole structure and find all folders and subfolders */}
        <Button
          className={cn("justify-start hover:bg-background/50 relative", {
            hidden: !createFolder.active,
          })}
          variant={"outline"}
        >
          <FolderPlusIcon />
          <Input
            type="text"
            className="h-max border-none focus-visible:ring-transparent bg-transparent"
            onBlur={() => setCreateFolder({ name: "", active: false })}
            onChange={(e) =>
              setCreateFolder({ ...createFolder, name: e.target.value })
            }
            value={createFolder.name}
            ref={createFolderRef}
            maxLength={20}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <p className="text-xs text-muted-foreground absolute my-auto right-3 pointer-events-none">
            Press enter
          </p>
        </Button>
        <Droppable droppableId="folders">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col"
            >
              {folders
                .filter((folder) => folder.parent === null)
                .map((folder, index) => (
                  <Folder
                    key={folder._id} // Make sure each key is unique
                    folder={folder}
                    indent={15}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="folders2">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col"
            >
              agag
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
