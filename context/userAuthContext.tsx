import { getTokenStorage, getUserStorage } from "@/utils/tokenService";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface User {
  name: string | undefined;
  authorities: string;
  role: string;
  isAuthenticated: boolean;
}

interface UserAuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface TokenDecodedResponse {
  iss: string;
  sub: string;
  authorities: string;
  iat: number;
  exp: number;
  jti: string;
  nbf: number;
}

const initialUser: User = {
  name: "",
  authorities: "",
  role: "",
  isAuthenticated: false,
};

export const UserAuthContext = createContext<UserAuthContextType>({
  user: initialUser,
  setUser: () => {},
  token: "",
  setToken: () => null,
});

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    const storedToken = getTokenStorage();
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = getUserStorage();
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (token !== "") {
      const tokenDecoded: TokenDecodedResponse = jwtDecode(token);

      if (tokenDecoded) {
        const role = tokenDecoded.authorities
          .split(",")
          .filter((item) => item.startsWith("ROLE_"))
          .join();

        const authorities = tokenDecoded.authorities
          .split(",")
          .filter((item) => item !== role)
          .join();

        const newUser: User = {
          name: tokenDecoded.sub,
          authorities: authorities.toLowerCase(),
          role: role.substring(5).toLowerCase(),
          isAuthenticated: true,
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    }
  }, [token]);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(UserAuthContext);
