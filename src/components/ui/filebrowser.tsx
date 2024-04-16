import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { File, FolderOpen } from "lucide-react";
import { structure } from "./sidebar";
import { Button } from "./button";

const FileBrowser = () => {
  return (
    <div className="flex flex-col p-5 pt-3 bg-muted/40 border-b border-b-border gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="flex gap-2 items-center" href="/">
              <FolderOpen size="16" /> Getting Started
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="flex gap-2 items-center" href="/">
              <FolderOpen size="16" /> Documentation
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="flex gap-2 items-center" href="/">
              <FolderOpen size="16" /> Vyzo
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="flex gap-2 items-center" href="/">
              <File size="16" /> 🚀 Welcome to Vyzo!
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col w-full">
        {/* @ts-ignore */}
        {structure[2].subfolders[0].subfolders[0].files.map((file, index) => (
          // Every second file should have a different background color
          <Button
            className={`justify-start hover:bg-background ${
              index % 2 === 0 ? "bg-muted-foreground/5" : ""
            } ${file.active ? "bg-muted-foreground/20" : ""}`}
            variant="ghost"
            key={index}
          >
            <File />
            <span className="ml-2">{file.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FileBrowser;
