import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(function () {
    setIsLoggedIn(localStorage.getItem("isLoggedin") === "1");
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedin", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedin", "0");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
