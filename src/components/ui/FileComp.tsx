import React from "react";
import { File, FolderIcon, Star, TextCursorInput, Trash } from "lucide-react";
import { Button } from "./button";
import { iFile } from "@/hooks/useFiles";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "./context-menu";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { cn } from "@/lib/utils";

interface iFileCompProps {
  index: number;
  file: iFile;
  currentFolder: string;
}

const FileComp = ({ index, file, currentFolder }: iFileCompProps) => {
  const { deleteFile, setCurrentFile, currentFile } =
    React.useContext(ApplicationContext);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          className={cn(
            "justify-start hover:bg-background py-2 h-max border border-transparent select-none",
            {
              "bg-muted-foreground/5": index % 2 === 0,
              "bg-background border-border": file._id === currentFile?._id,
            }
          )}
          variant={file._id === currentFile?._id ? "outline" : "ghost"}
          // @ts-ignore
          onClick={() => setCurrentFile(file!)}
        >
          <File size="12" />
          <span className="ml-2 text-xs">{file.name}</span>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="gap-2 ">
          <File size="14" />
          New File
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="gap-2 ">
          <Star size="14" />
          Add to favourites
        </ContextMenuItem>
        <ContextMenuItem className="gap-2 ">
          <TextCursorInput size="14" />
          Rename
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="gap-2 text-destructive"
          onClick={() => deleteFile(file._id!, currentFolder)}
        >
          <Trash size="14" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileComp;
