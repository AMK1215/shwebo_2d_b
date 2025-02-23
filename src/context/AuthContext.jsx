import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({ auth: null }); // Default value for clarity

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")); // Initialize token to null

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // Optional event listener for potential token updates
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange); // Cleanup
    };
  }, []); // Empty dependency array for initial token retrieval

  return (
    <AuthContext.Provider value={{ auth: token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
