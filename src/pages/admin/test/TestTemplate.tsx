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
import TestSortPanel from "./TestSortPanel";

const TestTemplate = () => {
  const { hash } = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [upperOn, setUpperOn] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [openSort, setOpenSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sorts, setSorts] = useState({ reportDate: "desc" });

  console.log(page);

  useEffect(() => {
    setLoading(true);
    GetAllReportsAPI(
      page,
      limit,
      Object.keys(sorts)[0],
      sorts[Object.keys(sorts)[0] as keyof typeof sorts]
    ).then((res) => {
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
  }, [page, limit, sorts]);

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
        <div className="template-panels-right">
          <TestSortPanel
            headers={reportsHeaders}
            sorts={sorts}
            setSorts={setSorts}
            openSort={openSort}
            setOpenSort={setOpenSort}
          />
        </div>
      </section>
      <section className={loading ? "template-main loading" : "template-main"}>
        {hash === "#table" && (
          <>
            <TestTableCards items={items} />
            <TestTable
              items={items}
              headers={reportsHeaders}
              sorts={sorts}
              setSorts={setSorts}
            />
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
