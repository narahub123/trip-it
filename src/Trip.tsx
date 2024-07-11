import RootLayout from "./layouts/RootLayout";
import TestRootLayout from "./layouts/test/RootLayout";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import MyPage from "./pages/mypage/MyPage";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import ScheduleLayout from "./layouts/ScheduleLayout";
import UserLayout from "./layouts/UserLayout";
import TestUserLayout from "./layouts/test/UserLayout";
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
import User from "./pages/admin/users/Users";
import Reports from "./pages/admin/reports/Reports";
import { ScheduleReturnType, ScheduleType } from "./types/schedules";
import ReportTest from "./pages/admin/reports/test/ReportTest";
import ReportsNode from "./pages/admin/reports/ReportsNode";
import Header from "./components/Header";
import TestUsers from "./pages/admin/test/TestTemplate";
import { useEffect } from "react";
import refreshAPIForNode from "./utils/TokenRefresherNode";
// import Post from "./pages/community/Post";

function Trip() {
  // for spring
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await refreshAPI.get("");
  //     } catch (err) {
  //       console.log("에러확인 : ", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // for nodejs
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshAPIForNode.get(`${baseURL}${pathname}`);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error === "logout") navigate("/login");
      }
    };

    fetchData();
  }, []);

  // schedule data(practice)
  // const schedules: ScheduleReturnType[] = [
  //   {
  //     scheduleId: 1,
  //     metroId: "1",
  //     startDate: "20240626",
  //     endDate: "20240628",
  //     registerDate: "20240621",
  //     userId: "1",
  //     scheduleTitle: "서울 여행",
  //     scheduleDetails: [],
  //   },
  //   {
  //     scheduleId: 2,
  //     metroId: "2",
  //     startDate: "20240704",
  //     endDate: "20240712",
  //     registerDate: "20240511",
  //     userId: "1",
  //     scheduleTitle: "인천 여행",
  //     scheduleDetails: [],
  //   },
  //   {
  //     scheduleId: 3,
  //     metroId: "3",
  //     startDate: "20240504",
  //     endDate: "20240513",
  //     registerDate: "20240211",
  //     userId: "1",
  //     scheduleTitle: "부산 여행",
  //     scheduleDetails: [],
  //   },
  // ];

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
          {/* <Route path="/community" element={<Post />} /> */}
          <Route element={<UserLayout />}>
            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route path="profile" element={<Profile />} />
              <Route path="personal" element={<Personal />} />
              <Route
                path="schedules"
                element={
                  <Schedules
                  // schedules={schedules}
                  />
                }
              />
              <Route path="schedules/:scheduleId" element={<Schedule />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:postId" element={<Detail />} />
              <Route path="blockedlist/user" element={<Bans />} />
            </Route>
            {/* 관리자 */}
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<User />} />
              <Route
                path="schedules"
                element={
                  <Schedules
                  // schedules={schedules}
                  />
                }
              />
              <Route path="posts" element={<Posts />} />
              {/* <Route path="reports" element={<Reports />} /> */}
              <Route path="reports" element={<ReportsNode />} />
              <Route path="reports/test" element={<ReportTest />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/login/normal" element={<Normal />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="/test" element={<TestRootLayout />}>
          <Route path="admin" element={<TestUserLayout />}>
            <Route path="users" element={<TestUsers />}></Route>
          </Route>
        </Route>
        <Route path="/planner/:metro_name" element={<ScheduleLayout />}></Route>
      </Routes>
    </Provider>
  );
}

export default Trip;
