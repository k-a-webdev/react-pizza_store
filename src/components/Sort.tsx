import { FC, useEffect, useRef, useState } from "react";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setActiveSort } from "../redux/slices/filterSlice";

type PopupClick = MouseEvent & {
  composedPath: () => Node[];
};

export const sortList = [
  { name: "популярністю (DESC)", type: "rating" },
  { name: "популярністю (ASC)", type: "-rating" },
  { name: "ціною (за спаданням)", type: "price" },
  { name: "ціною (за зростанням)", type: "-price" },
  { name: "алфавітом (DESC)", type: "title" },
  { name: "алфавітом (ASC)", type: "-title" },
];

const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Redux variables
  const dispatch = useAppDispatch();
  const activeSort = useSelector(
    (state: RootState) => state.filterReducer.activeSort
  );

  const onChangeSort = (i: number) => {
    dispatch(setActiveSort(i));
    setIsOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const _event = e as PopupClick;

      if (
        sortRef.current &&
        isOpen &&
        !_event.composedPath().includes(sortRef.current)
      )
        setIsOpen(false);
    };

    document.body.addEventListener("click", onClickOutside);

    return () => document.body.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортувати за:</b>
        <span onClick={() => setIsOpen((prev) => !prev)}>
          {sortList[activeSort].name}
        </span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((el, i) => {
              return (
                <li
                  className={activeSort === i ? "active" : ""}
                  onClick={() => onChangeSort(i)}
                  key={el.type}
                >
                  {el.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;

// TODO:
// - check styles of popup (touch to the border of the block)