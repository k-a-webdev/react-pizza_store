// Main imports
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setSearchValue } from "../../redux/filter/slice";
import { setPagesCount } from "../../redux/pizzas/slice";

// Styles
import styles from "./Search.module.scss";

// Main block
export const Search: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { activeCategory } = useSelector(
    (state: RootState) => state.filterReducer
  );

  // Search processing
  const setGlobalSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 400),
    []
  );
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalSearch(value);
    setInputValue(value);

    if (value.length > 0) dispatch(setPagesCount(1));
    else {
      if (activeCategory) dispatch(setPagesCount(1));
      else dispatch(setPagesCount(2));
    }
  };
  const onClearSearch = () => {
    dispatch(setSearchValue(""));
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        height="512"
        viewBox="0 0 512 512"
        width="512"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <title />
        <path
          d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
          style={{
            fill: "none",
            stroke: "#000",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          style={{
            fill: "none",
            stroke: "#000",
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
          x1="338.29"
          x2="448"
          y1="338.29"
          y2="448"
        />
      </svg>

      <input
        className={""}
        placeholder={t("header.searchPlaceholder")}
        onChange={onChangeSearch}
        value={inputValue}
        ref={inputRef}
      />

      {inputValue && (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.clearIcon}
          onClick={onClearSearch}
        >
          <defs></defs>
          <title />
          <g id="cross">
            <line
              style={{
                fill: "none",
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2px",
              }}
              x1="7"
              x2="25"
              y1="7"
              y2="25"
            />
            <line
              style={{
                fill: "none",
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2px",
              }}
              x1="7"
              x2="25"
              y1="25"
              y2="7"
            />
          </g>
        </svg>
      )}
    </div>
  );
};
