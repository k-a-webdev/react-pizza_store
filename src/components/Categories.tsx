// Main imports
import React from "react";
import { useTranslation } from "react-i18next";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setActiveCategory, setActivePage } from "../redux/filter/slice";

// Main block
export const Categories: React.FC = React.memo(() => {
  // Redux logic
  const dispatch = useAppDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.filterReducer.activeCategory
  );

  const { t } = useTranslation();

  const onChangeCategory = (index: number) => {
    dispatch(setActivePage(1));
    dispatch(setActiveCategory(index));
  };

  const categorieList = t("categories.categorieList", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="categories">
      <ul>
        {categorieList.map((el, i) => {
          return (
            <li
              onClick={() => onChangeCategory(i)}
              className={activeCategory === i ? "active" : ""}
              key={i}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
