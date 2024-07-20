import React from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";

interface IUserResponse {
  user: IUser;
}

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  activeGroup: string;
}

interface IData {
  data: {
    user: IUser;
  };
}

const useUser = () => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [userLoading, setUserLoading] = React.useState(false);
  const router = useRouter();

  const login = async (email: string, password: string, remember: boolean) => {
    setUserLoading(true);
    try {
      const res = await axios.post<{ token: string }>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
          remember,
        }
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Welcome back!");
        router.push("/app");
      }
    } catch (err: any) {
      console.error(err);

      if (err instanceof AxiosError && err?.response?.status == 400) {
        toast.error("Invalid credentials");
        return;
      }

      toast.error("An error has ocurred");
    } finally {
      setUserLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setUserLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      router.push("/login");
      toast.success("User created successfully. Please log in.");
    } catch (error) {
      console.error(error);
      toast.error("An error has ocurred");
    } finally {
      setUserLoading(false);
    }
  };

  const getUser = async () => {
    setUserLoading(true);
    try {
      const res: IData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
        {
          token: localStorage.getItem("token"),
        }
      );

      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("An error has ocurred.");
      console.error(error);
      router.push("/login");
    } finally {
      setUserLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    router.push("/login");
  };

  return {
    user,
    login,
    register,
    userLoading,
    getUser,
    logout,
    setUserLoading,
  };
};

export default useUser;
