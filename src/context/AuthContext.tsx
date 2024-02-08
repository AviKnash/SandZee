import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const INITAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setisAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      const { $id, name, username, email, imageUrl, bio } =
        await getCurrentUser();
      if ($id) {
        setUser({
          id: $id,
          name: name,
          username: username,
          email: email,
          imageUrl: imageUrl,
          bio: bio,
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}></AuthContext.Provider>;
};

export default AuthContext;
