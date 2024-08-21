import { ReactNode } from "react";
import { User } from "../models/User";

export interface AuthContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (
    user: User
  ) => Promise<{ status: boolean; message: string } | undefined>;
  signOut: () => boolean;
  signUp: (
    user: User
  ) => Promise<{ status: boolean; message: string } | undefined>;
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

export interface DecodedTokenProps {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  username: string;
}
