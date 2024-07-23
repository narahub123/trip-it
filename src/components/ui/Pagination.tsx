import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import "./pagination.css";

export interface PaginationProps {
  total: number;
  size: number;
  page: number;
  setPage: (value: number) => void;
}

const Pagination = ({ total, size, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(total / size);
  return (
    <nav className="pagination">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="pageController"
      >
        <FiChevronsLeft />
      </button>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="pageController"
      >
        <FiChevronLeft />
      </button>
      {Array(numPages)
        .fill("_")
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "pageNum active" : "pageNum"}
          >
            {i + 1}
          </button>
        ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="pageController"
      >
        <FiChevronRight />
      </button>
      <button
        onClick={() => setPage(numPages)}
        disabled={page === numPages}
        className="pageController"
      >
        <FiChevronsRight />
      </button>
    </nav>
  );
};

export default Pagination;
