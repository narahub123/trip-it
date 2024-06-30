import "./paginationControllerFixed.css";

export interface PaginationControllerFixedProps {
  limitArray: number[];
  limit: number;
  setLimit: (value: number) => void;
}

const PaginationControllerFixed = ({
  limitArray,
  limit,
  setLimit,
}: PaginationControllerFixedProps) => {
  return (
    <div className="pagination-controller-fixed">
      <p>페이지 당 일정 수({limit})</p>
      <ul className="pagination-controller-container">
        {/* 고정인 경우 */}
        {limitArray.map((limitNum) => (
          <li
            className="pagination-controller-item"
            data-pageNum={limitNum}
            key={limitNum}
            onClick={() => setLimit(limitNum)}
          >
            {limitNum}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationControllerFixed;
