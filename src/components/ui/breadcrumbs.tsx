import { ApplicationContext } from "@/providers/ApplicationProvider";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { iFile } from "@/hooks/useFiles";
import { iFolder } from "@/hooks/useFolders";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "./button";
import { FolderIcon } from "lucide-react";

const Breadcrumbs = () => {
  const {
    currentFile,
    currentFolder,
    setCurrentFile,
    setCurrentFolder,
    getBreadcrumbs,
    breadcrumbs,
  } = React.useContext(ApplicationContext);

  React.useEffect(() => {
    if (currentFolder && currentFile) {
      getBreadcrumbs(currentFolder!, currentFile!);
    }
  }, [currentFolder, currentFile]);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb: iFile | iFolder, index: number) => (
          <>
            <BreadcrumbItem key={index}>
              {index + 1 === breadcrumbs.length ? (
                <BreadcrumbPage className="cursor-default flex items-center gap-1">
                  <FolderIcon size={12} />
                  {breadcrumb.name}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    onClick={() => setCurrentFolder(breadcrumb._id!)}
                    className="cursor-pointer flex items-center gap-1"
                  >
                    <FolderIcon size={12} />
                    {breadcrumb.name}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
