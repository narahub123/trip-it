import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import "./testPagination.css";

export interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (value: number) => void;
}

const TestPagination = ({ total, limit, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(total / limit);

  return (
    <nav className="test-pagination">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="test-pageController"
      >
        <FiChevronsLeft />
      </button>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="test-pageController"
      >
        <FiChevronLeft />
      </button>
      {Array(numPages)
        .fill("_")
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "test-pageNum active" : "test-pageNum"}
          >
            {i + 1}
          </button>
        ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="test-pageController"
      >
        <FiChevronRight />
      </button>
      <button
        onClick={() => setPage(numPages)}
        disabled={page === numPages}
        className="test-pageController"
      >
        <FiChevronsRight />
      </button>
    </nav>
  );
};

export default TestPagination;
