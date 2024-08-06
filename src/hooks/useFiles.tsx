import { getSettings, setSettings } from "@/lib/settings";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

export interface iTag {
  color: string;
  name: string;
  owner: string;
}

export interface iFile {
  _id?: string;
  name?: string;
  parent?: string;
  owner?: string;
  favourite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  content?: string;
  tags?: iTag[];
  optimistic?: boolean;
  type?: string;
  fileName?: string;
  path?: string;
  size?: number;
  url?: string;
  fileType?: string;
}

const useFiles = () => {
  const [files, setFiles] = React.useState<iFile[]>([]);
  const [currentFile, setCurrentFile] = React.useState<iFile | null>(null);

  React.useEffect(() => {
    let settings = getSettings();

    if (settings && settings.persistence) {
      settings.persistence.file = currentFile;
      setSettings(settings);
    }
  }, [currentFile]);

  const getFiles = async (currentFolder: string) => {
    try {
      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/files/file?token=${localStorage.getItem(
          "token"
        )}&parent=${currentFolder}`
      );
      setFiles(files.filter((file) => !file.optimistic));
      setFiles(res.data.files);
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    }
  };

  const newFile = async (name: string, parent: string) => {
    try {
      setFiles([...files, { name, parent, optimistic: true }]);
      const res = await axios.post<any>(
        `${process.env.NEXT_PUBLIC_API_URL}/files/note`,
        {
          name,
          parent,
          token: localStorage.getItem("token"),
        }
      );
      getFiles(parent);
      setCurrentFile(res.data.file);
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    }
  };

  const deleteFile = async (id: string, currentFolder: string) => {
    try {
      setFiles(files.filter((file) => file._id !== id));
      await axios.delete(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/files/file?id=${id}&token=${localStorage.getItem("token")}`
      );
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    } finally {
      getFiles(currentFolder);
    }
  };

  const renameFile = async (
    id: string,
    value: string,
    currentFolder: string
  ) => {
    try {
      const index = files.findIndex((file) => file._id === id);
      let newFiles = files;
      newFiles[index].name = value;
      setFiles(newFiles);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/files/file/rename`, {
        id,
        value,
        token: localStorage.getItem("token"),
      });
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    } finally {
      getFiles(currentFolder);
    }
  };

  return {
    getFiles,
    newFile,
    deleteFile,
    files,
    currentFile,
    setCurrentFile,
    renameFile,
  };
};

export default useFiles;
