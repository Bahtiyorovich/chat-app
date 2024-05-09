import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem('User');
    setUser(JSON.parse(user));
  }, []);

  const handleRegister = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `http://localhost:8000/api/users/register`,
      JSON.stringify(registerInfo)
    );

    setIsLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        handleRegister,
        registerUser,
        registerError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
