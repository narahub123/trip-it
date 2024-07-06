import { useLocation } from "react-router-dom";
import ViewPanel from "../../../components/ui/ViewPanel";
import "./testTemplate.css";
import { useEffect, useState } from "react";
import { GetAllReportsForAdminAPI } from "../../../apis/reports";
import { reportsHeaders } from "../../../data/reports";
import TestTable from "./TestTable";
import TestTableCards from "./TestTableCards";
import SidebarUpper from "../../../components/SidebarUpper";
import { users } from "../../../data/test";
import TestGallery from "./TestGallery";
import { GetAllReportsAPI } from "./testReports";
import TestPagination from "./TestPagination";

const TestTemplate = () => {
  const { hash } = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [upperOn, setUpperOn] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(page);

  useEffect(() => {
    setLoading(true);
    GetAllReportsAPI(page, limit).then((res) => {
      const newItems = res.data.reports.map((item: any) => {
        return {
          ...item,
          reportId: item._id,
        };
      });

      setLoading(false);
      setItems(newItems);
      setTotalPage(res.data.totalPages);
    });
  }, [page, limit]);

  console.log(items);
  console.log(loading);

  return (
    <div className="template">
      <section className="template-title">
        <h1>templates</h1>
      </section>
      <section
        className="template-sidebar-upper"
        onClick={() => setUpperOn(!upperOn)}
      >
        <SidebarUpper upperOn={upperOn} />
      </section>

      <section className="template-panels">
        {/* page panel */}
        {/* total */}
        {/* control panel */}
        {/* setting panel */}
        <div className="template-panels-left">
          <ViewPanel hash={hash} />
        </div>
        <div className="template-panels-right">right</div>
      </section>
      <section className={loading ? "template-main loading" : "template-main"}>
        {hash === "#table" && (
          <>
            <TestTable items={items} headers={reportsHeaders} />
            <TestTableCards items={items} />
          </>
        )}
        {hash === "#gallery" && <TestGallery items={users} />}
      </section>
      <section className="template-search">search</section>
      <section className="template-pagination">
        <TestPagination
          total={totalPage}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </section>
    </div>
  );
};

export default TestTemplate;
