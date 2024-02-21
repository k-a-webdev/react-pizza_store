import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export default function index({ setCurrentPage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}
