import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
// import apiClient from '../lib/http-common';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const API_URL = "http://localhost:8080/api";
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const res = await axios.post(API_URL + "/auth/signin", data)
      .then(res => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        navigate("/dashboard");
        return res.data;
      });
    } catch(e){

    }
  };

  const register = (data) => {
    try {
      const res = axios.post(API_URL + "/auth/signup", data)
      .then(res => {
        return res.data;
      });
    } catch(e){

    }
    navigate("/login");
  };

  // call this function to sign out logged in user
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};