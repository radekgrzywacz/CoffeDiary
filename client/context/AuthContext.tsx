import axios from "axios";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {
    token: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (
    email: string,
    username: string,
    password: string,
    role: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "coffee_diary-JWT-access";
const REFRESH_TOKEN_KEY = "coffee_diary-JWT-refresh";
export const API_URL = "http://localhost:6060";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    refreshToken: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      console.log("AuthContext.tsx: 42 ~ loadToken ~ stored token: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          refreshToken: refreshToken,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      return await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        role
      });

    } catch (e: any) {
      const errorMessage = e.response.data.message || "An error occurred";
        return { error: true, msg: errorMessage };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      console.log("AuthContext.tsx:95 ~ login ~ result:", result.data);

      // Check if the response has an error
      if (result.data.statusCode !== 200) {
        return { error: true, msg: result || "Login failed" };
      }

      setAuthState({
        token: result.data.token,
        refreshToken: result.data.refreshToken,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync(
        REFRESH_TOKEN_KEY,
        result.data.refreshToken
      );

      return result;
    } catch (e: any) {
      const errorMessage = e.response.data.message || "An error occurred";
        return { error: true, msg: errorMessage };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
