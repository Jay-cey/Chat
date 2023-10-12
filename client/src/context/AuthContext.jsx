import { createContext, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, postRequest } from "../utils/services";

// Create a new Context for Authentication
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Set initial state
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Set the default role to "user"
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // When this component is rendered, try to load user data from local storage
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  // Function to update registration info
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // Function to update login info
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to register user
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      // Make call to server to register user
      try {
        const response = await postRequest(
          `${baseUrl}/users/register`,
          JSON.stringify(registerInfo)
        );
        setIsRegisterLoading(false);

        if (response.error) {
          return setRegisterError(response);
        }

        const sanitisedResponse = { ...response };
        delete sanitisedResponse.token;
        localStorage.setItem("User", JSON.stringify(sanitisedResponse));
        setUser(response);
      } catch (error) {
        setLoginError({ message: "A network error occurred" });
      }
    },
    [registerInfo]
  );

  // Function to Login user
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      // Make call to server to login user
      try {
        const response = await postRequest(
          `${baseUrl}/users/login`,
          JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false);

        if (response.error) {
          return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));

        navigate("/");
      } catch (error) {
        setLoginError({ message: "A network error occurred" });
      }
    },
    [loginInfo]
  );

  // Function to logout User
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  // Returns a Context Provider wrapped around the children, passing the state and update functions as value
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
