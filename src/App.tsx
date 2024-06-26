import React from "react";
import RootLayout from "./layouts/RootLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import MyPage from "./pages/mypage/MyPage";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import ScheduleLayout from "./layouts/ScheduleLayout";
import UserLayout from "./layouts/UserLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Profile from "./pages/mypage/profile/Profile";
import Personal from "./pages/mypage/personal/Personal";
import Join from "./pages/login/Join";
import "./Trip.css";
import Schedules from "./pages/mypage/schedule/Schedules";
import Details from "./pages/mypage/detail/Details";
import Bans from "./pages/mypage/ban/Bans";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route element={<UserLayout />}>
            <Route path="/mypage" element={<MyPage />}>
              <Route path="profile" element={<Profile />} />
              <Route path="personal" element={<Personal />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="schedules/:scheduleId" element={<Schedules />} />
              <Route path="details" element={<Details />} />
              <Route path="details/:detailId" element={<Details />} />
              <Route path="bans" element={<Bans />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route
          path="/schedule/:metro_name"
          element={<ScheduleLayout />}
        ></Route>
      </Routes>
    </Provider>
  );
}

export default App;
