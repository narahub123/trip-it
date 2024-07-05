import { Outlet } from "react-router-dom";
import "./rootLayout.css";
import { Rootstate } from "../../store/store";
import { useSelector } from "react-redux";
import HomeModal from "../../pages/home/HomeModal";
import Header from "../../components/Header";

const RootLayout = () => {
  // 모달 활성화 확인
  const active = useSelector((state: Rootstate) => state.modal.active);
  // 일정 확인(불필요)
  const schedule = useSelector((state: Rootstate) => state.schedule);
  console.log(schedule);

  return (
    <div className="test-root-layout">
      {active && <HomeModal />}
      <header className="test-root-layout-header">
        <Header />
      </header>
      <main className="test-root-layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
