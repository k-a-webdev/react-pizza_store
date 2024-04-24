import { FC } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useWhyDidYouUpdate } from "ahooks";

type PaginationProps = {
  onChangePage: (page: number) => void;
  activePage: number;
};

export const Pagination: FC<PaginationProps> = ({
  onChangePage,
  activePage,
}) => {
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
};
