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
import Pagination from "../../../components/ui/Pagination";

const TestTemplate = () => {
  const { hash } = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [upperOn, setUpperOn] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    GetAllReportsForAdminAPI().then((res) => {
      const newItems = res.data.map((item: any) => {
        return {
          ...item,
          reportId: item._id,
        };
      });

      setItems(newItems);
    });
  }, []);

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
      <section className="template-main">
        {hash === "#table" && (
          <>
            <TestTable
              headers={reportsHeaders}
              items={items}
              limit={limit}
              offset={offset}
            />
            <TestTableCards items={items} limit={limit} offset={offset} />
          </>
        )}
        {hash === "#gallery" && (
          <TestGallery items={users} limit={limit} offset={offset} />
        )}
      </section>
      <section className="template-search">search</section>
      <section className="template-pagination">
        <Pagination
          total={items.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </section>
    </div>
  );
};

export default TestTemplate;
