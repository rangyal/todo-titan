import { ReactNode, createContext, useContext, useState } from "react";

import { UserData } from "./types";

const useUser = () => {
  const [user, setUser] = useState<null | UserData>();

  return { user, setUser };
};

const UserContext = createContext<ReturnType<typeof useUser> | null>(null);

export const useUserContext = () => useContext(UserContext)!;

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={useUser()}>{children}</UserContext.Provider>
  );
}
