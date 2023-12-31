import React, { useCallback, useEffect } from "react";
import "./App.css";
import UsersPage from "./features/users/UsersPage";
import { useAppDispatch } from "./store/hooks";
import { getUsers } from "./features/users/usersSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SingleUserPage from "./features/users/SingleUserPage";

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<SingleUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
