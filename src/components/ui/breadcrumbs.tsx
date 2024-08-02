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
  const { currentFile, currentFolder, setCurrentFile, setCurrentFolder } =
    React.useContext(ApplicationContext);
  const [breadcrumbs, setBreadcrumbs] = React.useState<any>([]);

  const getBreadcrumbs = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/breadcrumbs`,
        {
          token: localStorage.getItem("token"),
          folderId: currentFolder ? currentFolder : null,
        }
      );

      let path = res.data.path;
      if (currentFile) {
        path.push(currentFile);
      }

      setBreadcrumbs(path);
      console.log(path);
    } catch (error) {
      console.error(error);
      toast.error("Error while getting breadcrumbs");
    }
  };

  React.useEffect(() => {
    getBreadcrumbs();
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
