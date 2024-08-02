import React from "react";
import {
  File,
  FileText,
  FolderIcon,
  ImageIcon,
  NotebookIcon,
  Star,
  TextCursorInput,
  Trash,
} from "lucide-react";
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
import { Input } from "./input";

interface iFileCompProps {
  index: number;
  file: iFile;
  currentFolder: string;
}

const FileComp = ({ index, file, currentFolder }: iFileCompProps) => {
  const { deleteFile, setCurrentFile, currentFile, renameFile } =
    React.useContext(ApplicationContext);
  const [rename, setRename] = React.useState({
    value: file.name,
    active: false,
  });
  const renameRef = React.useRef<any>(null);

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = rename.value;
      renameRef.current.blur();

      console.log(value);
      renameFile(file._id!, rename.value!, currentFolder);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      renameRef.current.blur();
    }
  };

  React.useEffect(() => {
    if (rename.active) {
      setTimeout(() => {
        renameRef.current.focus();
      }, 200);
    }
  }, [rename]);

  const getIcon = () => {
    const props = {
      size: 12,
    };
    switch (file.fileType) {
      case "note":
        return <NotebookIcon {...props} />;
      case "image/jpeg":
      case "image/png":
        return <ImageIcon {...props} />;
      case "application/pdf":
        return <FileText {...props} />;
      default:
        return <File {...props} />;
    }
  };

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
          {getIcon()}
          <span
            className={cn("ml-2 select-none text-xs", {
              "hidden opacity-100": rename.active,
            })}
          >
            {file.name}
          </span>
          <Input
            type="text"
            className={cn(
              "hidden h-max border-none focus-visible:ring-transparent bg-transparent",
              {
                "flex  opacity-100": rename.active,
              }
            )}
            onBlur={() => setRename({ value: file.name, active: false })}
            onChange={(e) => setRename({ ...rename, value: e.target.value })}
            value={rename.value}
            maxLength={20}
            onKeyDown={(e) => handleKeyDown(e)}
            ref={renameRef}
          />
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
        <ContextMenuItem
          className="gap-2"
          onClick={() => setRename({ value: file.name, active: true })}
        >
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
