import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";

export default function index({ onChangePage, activePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={activePage - 1}
      renderOnZeroPageCount={null}
    />
  );
}
