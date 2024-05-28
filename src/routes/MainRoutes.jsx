import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Budgets,
  Dashboard,
  Demandes,
  Login,
  Navbar,
  Register,
  Rubrics,
  Sidebar,
  Users,
} from "../containers";
import PrivateRoute from "./PrivateRoute";

const MainRoute = () => {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // // console.log(isScrolled);
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {["/login", "/register"].includes(location.pathname) ? null : <Navbar />}
      <div
        className={` w-full    ${
          ["/login", "/register"].includes(location.pathname)
            ? ""
            : "pl-64 pt-16"
        }`}
      >
        {["/login", "/register"].includes(location.pathname) ? null : (
          <Sidebar />
        )}

        <div className="p-6">
          <Routes>
            <Route
              index
              element={
                <PrivateRoute roles={["admin", "chef de laboratoire"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="users"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="budgets"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Budgets />
                </PrivateRoute>
              }
            />
            <Route
              path="rubrics"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Rubrics />
                </PrivateRoute>
              }
            />
            <Route
              path="demandes"
              element={
                <PrivateRoute roles={["admin", "etudiant", "enseignant"]}>
                  <Demandes />
                </PrivateRoute>
              }
            />
            <Route
              path="demandes/:data"
              element={
                <PrivateRoute roles={["admin", "etudiant", "enseignant"]}>
                  <Demandes />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainRoute;
