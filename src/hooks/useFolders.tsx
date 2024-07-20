import axios from "axios";
import React from "react";
import { toast } from "sonner";

export interface iFolder {
  _id?: string;
  name?: string;
  path?: string;
  owner?: string;
  optimistic?: boolean;
  active?: boolean;
  parent?: string | null;
}

const useFolders = () => {
  const [folders, setFolders] = React.useState<iFolder[]>([]);
  const [currentFolder, setCurrentFolder] = React.useState<string | null>(null);

  const getFolders = async () => {
    try {
      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/folders/folder?token=${localStorage.getItem("token")}`
      );
      setFolders(folders.filter((folder) => !folder.optimistic));
      setFolders(res.data.folders);
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred while fetching folders");
    }
  };

  const newFolder = async (name: string, path: string, parent: string) => {
    try {
      setFolders([
        ...folders,
        {
          name,
          path,
          optimistic: true,
          parent: parent ? parent : null,
        },
      ]);
      const res = await axios.post<any>(
        `${process.env.NEXT_PUBLIC_API_URL}/folders/folder`,
        {
          name,
          path,
          token: localStorage.getItem("token"),
          parent: parent ? parent : null,
        }
      );
      setCurrentFolder(res.data.folder._id);
      getFolders();
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      setFolders(folders.filter((folder) => folder._id !== id));
      await axios.delete(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/folders/folder?id=${id}&token=${localStorage.getItem("token")}`
      );
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    } finally {
      getFolders();
    }
  };

  const renameFolder = async (id: string, value: string) => {
    try {
      const index = folders.findIndex((folder) => folder._id === id);
      let newFolders = folders;
      newFolders[index].name = value;
      setFolders(newFolders);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/folders/folder/rename`,
        {
          id,
          value,
          token: localStorage.getItem("token"),
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("An error ocurred. Please try again later");
    } finally {
      getFolders();
    }
  };

  return {
    folders,
    newFolder,
    getFolders,
    deleteFolder,
    renameFolder,
    currentFolder,
    setCurrentFolder,
  };
};

export default useFolders;
