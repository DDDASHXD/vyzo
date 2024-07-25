import React from "react";
import {
  FolderClosed,
  Trash,
  FolderIcon,
  File,
  Star,
  TextCursorInput,
  FolderPlusIcon,
  FolderOpenIcon,
  ChevronRight,
} from "lucide-react";
import { Button } from "./button";
import { iFolder } from "@/hooks/useFolders";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "./context-menu";
import { Input } from "./input";
import { Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { toast } from "sonner";
interface iFolderProps {
  folder: iFolder;
  indent: number;
  index: number;
}

const Folder = ({ folder, indent, index }: iFolderProps) => {
  const {
    deleteFolder,
    renameFolder,
    newFolder,
    currentFolder,
    setCurrentFolder,
    folders,
    beginDrag,
    dragging,
    dragged,
    getFolders,
    setFolders,
  } = React.useContext(ApplicationContext);
  const [hovered, setHovered] = React.useState(false);
  const [rename, setRename] = React.useState({
    value: folder.name,
    active: false,
  });
  const folderRef = React.useRef<any>(null);
  const renameRef = React.useRef<any>(null);

  const [createFolder, setCreateFolder] = React.useState({
    active: false,
    name: "",
  });
  const createFolderRef = React.useRef<any>(null);

  const [folderOpen, setFolderOpen] = React.useState(false);

  const hasParentWithID = (element: any, targetID: string) => {
    while (element) {
      if (element.id === targetID) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = rename.value;
      renameRef.current.blur();

      console.log(value);
      renameFolder(folder._id!, rename.value!);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      renameRef.current.blur();
    }
  };

  const handleCreateKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = createFolder.name;
      createFolderRef.current.blur();

      console.log(value);
      setFolderOpen(true);
      newFolder(value, "/", folder._id!);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      createFolderRef.current.blur();
    }
  };

  const handleMouseMove = (e: any) => {
    if (
      dragging &&
      dragged!._id !== folder._id &&
      !hasParentWithID(folderRef.current, dragged!._id!)
    ) {
      setHovered(true);
    }
  };

  const handleMouseUp = async () => {
    if (
      dragged &&
      dragged!._id !== folder._id &&
      !hasParentWithID(folderRef.current, dragged._id!)
    ) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/folders/move`, {
          folder: dragged,
          newParent: folder,
          token: localStorage.getItem("token"),
        });
        getFolders();
        setFolderOpen(true);
      } catch (error) {
        toast.error("An error ocurred while moving file");
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    if (createFolder.active) {
      createFolderRef.current.focus();
    }
  }, [createFolder]);

  React.useEffect(() => {
    if (rename.active) {
      setTimeout(() => {
        renameRef.current.focus();
      }, 200);
    }
  }, [rename]);

  return (
    <div
      className="w-full select-none cursor-pointer"
      onDrag={(e) => console.log(e)}
      id={folder._id}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button
            className={cn(
              "justify-start hover:bg-background/50 relative h-max py-2 border border-transparent w-full",
              {
                "border-border": folder._id === currentFolder,
                "bg-black/20 hover:bg-black/20": hovered,
              }
            )}
            style={{ paddingLeft: indent }}
            variant={folder._id === currentFolder ? "outline" : "ghost"}
            onClick={() => {
              setCurrentFolder(folder._id!);
              setFolderOpen(true);
            }}
            onMouseDown={(e) => beginDrag(e, { folder: folder })}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={(e) => setHovered(false)}
            onMouseUp={() => handleMouseUp()}
            ref={folderRef}
          >
            <ChevronRight
              className={cn("text-muted-foreground mr-2 transition-all", {
                "rotate-90": folderOpen,
              })}
              onClick={() =>
                setTimeout(() => {
                  setFolderOpen(!folderOpen);
                }, 1)
              }
              size={15}
            />
            {folderOpen ? (
              <FolderOpenIcon size="12" />
            ) : (
              <FolderClosed size="12" />
            )}
            <span
              className={cn("ml-2 select-none text-xs", {
                "hidden opacity-100": rename.active,
              })}
            >
              {folder.name}
            </span>
            <Input
              type="text"
              className={cn(
                "hidden h-max border-none focus-visible:ring-transparent bg-transparent",
                {
                  "flex  opacity-100": rename.active,
                }
              )}
              onBlur={() => setRename({ value: folder.name, active: false })}
              onChange={(e) => setRename({ ...rename, value: e.target.value })}
              value={rename.value}
              maxLength={20}
              onKeyDown={(e) => handleKeyDown(e)}
              ref={renameRef}
            />
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="gap-2"
            onClick={() => setCreateFolder({ ...createFolder, active: true })}
          >
            <FolderIcon size="14" /> New Folder
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="gap-2 ">
            <Star size="14" />
            Add to favourites
          </ContextMenuItem>
          <ContextMenuItem
            className="gap-2 "
            onClick={() => setRename({ value: folder.name, active: true })}
          >
            <TextCursorInput size="14" />
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            className="gap-2 text-destructive"
            onClick={() => deleteFolder(folder._id!)}
          >
            <Trash size="14" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Button
        className={cn("justify-start hover:bg-background/50 relative", {
          hidden: !createFolder.active,
        })}
        variant={"outline"}
        style={{ paddingLeft: indent + 15 }}
      >
        <ChevronRight
          className={cn("text-muted-foreground mr-2 transition-all", {
            "rotate-90": folderOpen,
          })}
          size={15}
        />
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
          onKeyDown={(e) => handleCreateKeyDown(e)}
        />
        <p className="text-xs text-muted-foreground absolute my-auto right-3 pointer-events-none">
          Press enter
        </p>
      </Button>
      {folderOpen &&
        folders
          .filter((subFolder) => subFolder.parent === folder._id)
          .map((subFolder, index) => (
            <Folder
              key={subFolder._id} // Make sure each key is unique
              folder={subFolder}
              indent={indent + 15}
              index={index}
            />
          ))}
    </div>
  );
};

export default Folder;
