import { createContext, useState } from "react";
import { User } from "../models/User";
import { AuthContextProviderProps, AuthContextType } from "../utils/Props";

// Create a context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Create a provider
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (_user: User) => {};

  const signOut = () => {};

  const signUp = async (_user: User) => {};

  console.log(user);
  console.log(isSignedIn);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isSignedIn,
        setIsSignedIn,
        signIn,
        signOut,
        signUp,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
