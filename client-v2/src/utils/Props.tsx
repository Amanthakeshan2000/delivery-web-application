import { ReactNode } from "react";
import { User } from "../models/User";

export interface AuthContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (user: User) => Promise<void>;
  signOut: () => void;
  signUp: (user: User) => Promise<void>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface ReactHotToastProps {
  message: string;
  type: "success" | "error" | "loading" | "blank";
}
