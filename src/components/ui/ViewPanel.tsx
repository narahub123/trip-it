import { LuTable } from "react-icons/lu";
import { RiGalleryView2 } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./viewPanel.css";

export interface ViewPanelProps {
  hash: string;
}

const ViewPanel = ({ hash }: ViewPanelProps) => {
  return (
    <div className="view-panel">
      <Link
        to={`#table`}
        title="테이블"
        className={
          hash === "#table" || !hash
            ? "view-panel-item active"
            : "view-panel-item"
        }
      >
        <LuTable />
      </Link>
      <Link
        to={`#gallery`}
        title="갤러리"
        className={
          hash === "#gallery" ? "view-panel-item active" : "view-panel-item"
        }
      >
        <RiGalleryView2 />
      </Link>
    </div>
  );
};

export default ViewPanel;
