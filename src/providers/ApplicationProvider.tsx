// @ts-nocheck

import React, { Children } from "react";
import useUser from "@/hooks/useUser";
import useFolders from "@/hooks/useFolders";
import useFiles from "@/hooks/useFiles";
import type { iFolder } from "@/hooks/useFolders";
import { iFile } from "@/hooks/useFiles";

interface iApplicationContextProps {
  user: any;
  refetchUser: () => void;
  login: (email: string, password: string, remember: boolean) => void;
  userLoading: boolean;
  getUser: () => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
  setUserLoading: (value: boolean) => void;

  getFolders: () => void;
  newFolder: (name: string, path: string, parent: string | null) => void;
  folders: iFolder[];
  deleteFolder: (id: string) => void;
  renameFolder: (id: string, value: string) => void;
  setCurrentFolder: (id: string | null) => void;
  currentFolder: string | null;

  getFiles: (currentFolder: string) => void;
  newFile: (name: string, parent: string) => void;
  deleteFile: (id: string, currentFolder: string) => void;
  files: iFile[];
  setCurrentFile: iFile | null;
  currentFile: iFile | null;
}

export const ApplicationContext = React.createContext<iApplicationContextProps>(
  {
    user: null,
    refetchUser: () => {},
    login: (email, password, remember) => {},
    userLoading: false,
    getUser: () => {},
    logout: () => {},
    register: (name, email, password) => {},
    setUserLoading: (value) => {},

    getFolders: () => {},
    newFolder: (name, path, parent) => {},
    folders: null,
    deleteFolder: (id) => {},
    renameFolder: (id, value) => {},
    setCurrentFolder: (id) => {},
    currentFolder: null,

    getFiles: (currentFolder) => {},
    newFile: (name, parent) => {},
    deleteFile: (id, currentFolder) => {},
    files: null,
    setCurrentFile: (file) => {},
    currentFile: null,
  }
);

export const ApplicationProvider: React.FC = ({ children }) => {
  const {
    user,
    login,
    register,
    userLoading,
    getUser,
    logout,
    setUserLoading,
  } = useUser();

  const {
    getFolders,
    newFolder,
    folders,
    deleteFolder,
    renameFolder,
    setCurrentFolder,
    currentFolder,
  } = useFolders();

  const { getFiles, newFile, deleteFile, files, currentFile, setCurrentFile } =
    useFiles();

  return (
    <ApplicationContext.Provider
      value={{
        user,
        login,
        userLoading,
        getUser,
        logout,
        register,
        setUserLoading,

        getFolders,
        newFolder,
        folders,
        deleteFolder,
        renameFolder,
        setCurrentFolder,
        currentFolder,

        getFiles,
        newFile,
        deleteFile,
        setCurrentFile,
        files,
        currentFile,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
