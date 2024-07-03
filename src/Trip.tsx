import React, { useEffect } from "react";
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
import Bans from "./pages/mypage/ban/Bans";
import Schedule from "./pages/mypage/schedule/Schedule";
import Normal from "./pages/login/Normal";
import refreshAPI from "./utils/TokenRefresher";
import Posts from "./pages/mypage/post/Posts";
import Detail from "./pages/mypage/post/Detail";
import Post from "./pages/community/Post";
import User from "./pages/admin/users/Users";
import Reports from "./pages/admin/reports/Reports";
import { ScheduleReturnType, ScheduleType } from "./types/schedules";
import ReportTest from "./pages/admin/reports/test/ReportTest";

function Trip() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await refreshAPI.get("");
      } catch (err) {
        console.log("에러확인 : ", err);
      }
    };

    fetchData();
  }, []);

  // schedule data(practice)
  const schedules: ScheduleReturnType[] = [
    {
      scheduleId: 1,
      metroId: "1",
      startDate: "20240626",
      endDate: "20240628",
      registerDate: "20240621",
      userId: "1",
      scheduleTitle: "서울 여행",
      scheduleDetails: [],
    },
    {
      scheduleId: 2,
      metroId: "2",
      startDate: "20240704",
      endDate: "20240712",
      registerDate: "20240511",
      userId: "1",
      scheduleTitle: "인천 여행",
      scheduleDetails: [],
    },
    {
      scheduleId: 3,
      metroId: "3",
      startDate: "20240504",
      endDate: "20240513",
      registerDate: "20240211",
      userId: "1",
      scheduleTitle: "부산 여행",
      scheduleDetails: [],
    },
  ];

  // post data(practice)
  const posts = [
    {
      postId: "1",
      scheduleId: "1",
      metroId: "1",
      startDate: "20240602",
      endDate: "20240612",
      postTitle: "모여라~",
      personnel: 2,
      userId: "1",
      age: 32,
      gender: "f",
      postDate: "20240512",
      postPic:
        "https://res.heraldm.com/content/image/2023/08/19/20230819000100_0.jpg",
      recruit_status: "n",
      views: 2,
      exposure_status: "y",
    },
  ];

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/community" element={<Post />} />
          <Route element={<UserLayout />}>
            <Route path="/mypage" element={<MyPage />}>
              <Route path="profile" element={<Profile />} />
              <Route path="personal" element={<Personal />} />
              <Route
                path="schedules"
                element={<Schedules schedules={schedules} />}
              />
              <Route path="schedules/:scheduleId" element={<Schedule />} />
              <Route path="posts" element={<Posts posts={posts} />} />
              <Route path="posts/:postId" element={<Detail />} />
              <Route path="blockedlist/user" element={<Bans />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<User />} />
              <Route
                path="schedules"
                element={<Schedules schedules={schedules} />}
              />
              <Route path="posts" element={<Posts posts={posts} />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/test" element={<ReportTest />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/login/normal" element={<Normal />} />
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

export default Trip;
