// Main imports
import React from "react";
import { useTranslation } from "react-i18next";

// Redux Toolkit imports
import { useAppDispatch } from "../redux/store";
import { setActiveSort } from "../redux/filter/slice";

// Types
type PopupClick = MouseEvent & {
  composedPath: () => Node[];
};

export const sortListType = [
  { type: "rating" },
  { type: "-rating" },
  { type: "price" },
  { type: "-price" },
  { type: "title" },
  { type: "-title" },
];

// Main block
export const Sort: React.FC<{ activeSort: number }> = React.memo(
  ({ activeSort }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const onChangeSort = (i: number) => {
      dispatch(setActiveSort(i));
      setIsOpen(false);
    };

    const sortListName = t("sort.sortListName", {
      returnObjects: true,
    }) as string[];

    React.useEffect(() => {
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
      <div
        ref={sortRef}
        className="sort"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: activeSort % 2 === 0 ? "rotate(180deg)" : "",
            }}
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>{t("sort.label")}</b>
          <span>{sortListName[activeSort]}</span>
        </div>
        {isOpen && (
          <div
            className="sort__popup"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <ul>
              {sortListName.map((el, i) => {
                return (
                  <li
                    className={activeSort === i ? "active" : ""}
                    onClick={() => onChangeSort(i)}
                    key={sortListType[i].type}
                  >
                    {el}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
