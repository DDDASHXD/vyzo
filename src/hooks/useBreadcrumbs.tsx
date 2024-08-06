import React from "react";
import { iFile } from "./useFiles";
import axios from "axios";
import { toast } from "sonner";

const useBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([]);

  const getBreadcrumbs = async (currentFolder: string, currentFile: iFile) => {
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

  return { getBreadcrumbs, breadcrumbs, setBreadcrumbs };
};

export default useBreadcrumbs;
