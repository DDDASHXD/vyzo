import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  File,
  FilePlus,
  FolderIcon,
  FolderOpen,
  Upload,
  UploadCloud,
} from "lucide-react";
import { Button } from "./button";
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { ContextMenuContent, ContextMenuItem } from "./context-menu";
import { ApplicationContext } from "@/providers/ApplicationProvider";
import { iFile } from "@/hooks/useFiles";
import FileComp from "./FileComp";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";
import Breadcrumbs from "./breadcrumbs";

const FileBrowser = () => {
  const { currentFolder, newFile, getFiles, files, setCurrentFile } =
    React.useContext(ApplicationContext);
  const [createFile, setCreateFile] = React.useState({
    active: false,
    value: "",
  });
  const createFileRef = React.useRef<any>(null);

  const onDrop = React.useCallback(
    async (file: any) => {
      try {
        console.log(file);
        const formData = new FormData();
        const token = localStorage.getItem("token");
        formData.append("file", file[0]);
        formData.append("token", token!);
        formData.append("parent", currentFolder!);
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_URL! + "/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("File uploaded");
        getFiles(currentFolder!);

        //@ts-expect-error
        setCurrentFile(res.data.file);
      } catch (error) {
        console.error(error);
        toast.error("An error ocurred while uploading file");
      }
    },
    [currentFolder]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = createFile.value;
      createFileRef.current.blur();

      if (value.length >= 1) {
        newFile(value, currentFolder!);
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      createFileRef.current.blur();
    }
  };

  React.useEffect(() => {
    if (createFile.active) {
      createFileRef.current.focus();
    }
  });

  React.useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="flex flex-col p-5 pt-3 bg-muted/40 gap-4 h-full overflow-y-auto relative"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute top-0 left-0 w-full h-full bg-muted/60 z-10 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center border bg-muted size-10 rounded-md border-border">
                <UploadCloud />
              </div>
              <h3 className="font-semibold">Upload file</h3>
            </div>
          )}
          {currentFolder && <Breadcrumbs />}
          <div className="flex flex-col w-full h-full">
            {files.map((file: iFile, index: number) => (
              // Every second file should have a different background color
              <FileComp
                key={index}
                index={index}
                file={file}
                currentFolder={currentFolder!}
              />
            ))}
            <Button
              className={cn(`justify-start hover:bg-background py-2 h-max`, {
                hidden: !createFile.active,
              })}
              variant="ghost"
            >
              <FilePlus size="12" />
              <Input
                type="text"
                className="border-none focus-visible:ring-transparent bg-transparent text-xs h-full"
                onBlur={() => setCreateFile({ value: "", active: false })}
                onChange={(e) =>
                  setCreateFile({ ...createFile, value: e.target.value })
                }
                value={createFile.value}
                ref={createFileRef}
                maxLength={40}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <p className="text-xs text-muted-foreground absolute my-auto right-3 pointer-events-none">
                Press enter
              </p>
            </Button>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="gap-2"
          onClick={() => setCreateFile({ ...createFile, active: true })}
        >
          <File size="14" />
          New Note
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileBrowser;
