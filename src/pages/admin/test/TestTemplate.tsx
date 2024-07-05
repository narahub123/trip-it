import { useLocation } from "react-router-dom";
import ViewPanel from "../../../components/ui/ViewPanel";
import "./testTemplate.css";

const TestTemplate = () => {
  const { hash } = useLocation();

  return (
    <div className="template">
      <section className="template-title">
        <h1>templates</h1>
      </section>
      <section className="template-panels">
        {/* view panel */}
        {/* page panel */}
        {/* total */}
        {/* control panel */}
        {/* setting panel */}
        <div className="template-panels-left">
          <ViewPanel hash={hash} />
        </div>
        <div className="template-panels-right">right</div>
      </section>
      <section className="template-main">main</section>
      <section className="template-search">search</section>
      <section className="template-pagination">pagination</section>
    </div>
  );
};

export default TestTemplate;
