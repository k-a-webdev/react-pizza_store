import { FC } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type PaginationProps = {
  onChangePage: (page: number) => void;
  activePage: number;
};

export const Pagination: FC<PaginationProps> = ({
  onChangePage,
  activePage,
}) => {
  const { pagesCount } = useSelector((state: RootState) => state.pizzasReducer);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={pagesCount}
      forcePage={activePage - 1}
      renderOnZeroPageCount={null}
    />
  );
};
