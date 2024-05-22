import React from "react";
import RootLayout from "./layouts/RootLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import MyPage from "./pages/mypage/MyPage";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import SignIn from "./pages/signin/SignIn";
import ScheduleLayout from "./layouts/ScheduleLayout";
import UserLayout from "./layouts/UserLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route element={<UserLayout />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="/schedule" element={<ScheduleLayout />}></Route>
    </Routes>
  );
}

export default App;
