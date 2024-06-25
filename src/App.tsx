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
import { Provider } from "react-redux";
import { store } from "./store/store";
import Profile from "./pages/mypage/Profile";

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
            </Route>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
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
