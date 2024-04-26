// Main imports
import React from "react";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setActiveCategory } from "../redux/filter/slice";
import { useTranslation } from "react-i18next";
import { TOptions } from "i18next";

// Main block
export const Categories: React.FC = React.memo(() => {
  // Redux logic
  const dispatch = useAppDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.filterReducer.activeCategory
  );

  const { t } = useTranslation();

  const onChangeCategory = (index: number) => {
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
