// @ts-nocheck

import React, { Children } from "react";
import useUser from "@/hooks/useUser";

interface iApplicationContextProps {
  user: any;
  refetchUser: () => void;
  login: (email: string, password: string, remember: boolean) => void;
  userLoading: boolean;
  getUser: () => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
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
  }
);

export const ApplicationProvider: React.FC = ({ children }) => {
  const { user, login, register, userLoading, getUser, logout } = useUser();

  return (
    <ApplicationContext.Provider
      value={{
        user,
        login,
        userLoading,
        getUser,
        logout,
        register,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
