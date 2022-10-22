// eslint-disable-next-line
import Home from "../src/component/Home/Home/Home";
import { Routes, Route } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Dashboard from "./component/Dashoboard/Dashboard/Dashboard";
import { getDecodedUser } from "./component/Login/LoginManager";
import LoginModal from "./component/Login/LoginModal";
import PrivateRoute from "./component/Login/PrivateRoute";
import NotFound from "./component/NotFound";
export const UserContext = createContext();

const App = () => {
  const [admin, setAdmin] = useState(0);
  const [selectedService, setSelectedService] = useState({});
  const [user, setUser] = useState(getDecodedUser());
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin != 0 && isAdmin != null) {
      setAdmin(1);
    }
  }, [admin]);

  useEffect(() => {
    const image = localStorage.getItem("userImage");
    if (image != null) {
      setUserImage(image);
    }
  }, [userImage]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        selectedService,
        userImage,
        setSelectedService,
        setUserImage,
      }}
    >
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" />
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute redirectTo="/login">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
