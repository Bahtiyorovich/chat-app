import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleRegister = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const handleLogin = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      'http://localhost:8000/api/users/register',
      JSON.stringify(registerInfo)
    );

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response.error);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  const loginUser = useCallback(async(e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest('http://localhost:8000/api/users/login', 
      JSON.stringify(loginInfo));

    setIsLoginLoading(false);

    if (response.error) {
      return setLoginError(response.error);
    }

    localStorage.setItem("User", response);
    setUser(response);

  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    setUser(user); // user ni localStorage dan o'qib olamiz
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        handleRegister,
        registerUser,
        registerError,
        isRegisterLoading,
        loginError,
        isLoginLoading,
        logout,
        handleLogin,
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
