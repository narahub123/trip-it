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
import Blocks from "./pages/admin/blocks/Blocks";
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
        // 리프레시 토큰이 없는 경우
        if (error === "logout") navigate("/login");
        // 관리자가 아닌 경우
        if (error === "NoAdmin") {
          console.log("hi");
          navigate(-1);
        }
      }
    };

    fetchData();
  }, [pathname]);

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
              <Route path="blocks" element={<Blocks />} />
              <Route path="reports" element={<Bans />} />
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
              <Route path="blocks" element={<Blocks />} />
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
