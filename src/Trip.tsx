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
import { ScheduleType } from "./types/schedules";

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
  const schedules: ScheduleType[] = [
    {
      schedule_id: "1",
      metro_id: "1",
      start_date: "20240626",
      end_date: "20240628",
      register_date: "20240621",
      user_id: "1",
      schedule_title: "서울 여행",
    },
    {
      schedule_id: "2",
      metro_id: "2",
      start_date: "20240704",
      end_date: "20240712",
      register_date: "20240511",
      user_id: "1",
      schedule_title: "인천 여행",
    },
    {
      schedule_id: "3",
      metro_id: "3",
      start_date: "20240504",
      end_date: "20240513",
      register_date: "20240211",
      user_id: "1",
      schedule_title: "부산 여행",
    },
  ];

  // post data(practice)
  const posts = [
    {
      post_id: "1",
      schedule_id: "1",
      metro_id: "1",
      start_date: "20240602",
      end_date: "20240612",
      post_title: "모여라~",
      personnel: 2,
      user_id: "1",
      age: 32,
      gender: "f",
      post_date: "20240512",
      post_pic:
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
              <Route path="bans" element={<Bans />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<User />} />
              <Route
                path="schedules"
                element={<Schedules schedules={schedules} />}
              />
              <Route path="posts" element={<Posts posts={posts} />} />
              <Route path="reports" element={<Reports />} />
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
