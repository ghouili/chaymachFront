/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const MainContext = createContext();
const ContextProvider = ({ children }) => {
    const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("token"));
  const [userId, setUserId] = useState(cookies.get("id"));
  // let user = cookies.get('userData');
  useEffect(() => {
    setUserId(cookies.get("id"));
    setToken(cookies.get("token"));
  }, []);

  let values = {token, userId};
  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export { MainContext, ContextProvider };
