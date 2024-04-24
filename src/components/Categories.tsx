// Main imports
import React from "react";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { setActiveCategory } from "../redux/filter/slice";

// Main block
export const Categories: React.FC = React.memo(() => {
  const categorieList = [
    "Всі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  // Redux logic
  const dispatch = useAppDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.filterReducer.activeCategory
  );

  const onChangeCategory = (index: number) => {
    dispatch(setActiveCategory(index));
  };

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
