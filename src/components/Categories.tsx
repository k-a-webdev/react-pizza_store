// Main imports
import React from "react";
import { useTranslation } from "react-i18next";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setActiveCategory, setActivePage } from "../redux/filter/slice";
import { clsx } from "clsx";

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
    <div className="flex flex-wrap">
      <ul className="flex gap-2.5 flex-wrap">
        {categorieList.map((el, i) => {
          return (
            <li
              onClick={() => onChangeCategory(i)}
              className={clsx("py-2 px-5 md:py-3.5 md:px-8 bg-background-categories rounded-3xl font-bold cursor-pointer transition duration-150 easy-in-out hover:brightness-[93%] active:brightness-[90%]", activeCategory === i && "bg-myGray-2 text-white")}
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
