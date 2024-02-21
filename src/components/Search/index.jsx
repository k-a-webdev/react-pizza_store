import { useContext } from "react";

import styles from "./Search.module.scss";

import { AppContext } from "../../App";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(AppContext);

  const onClearSearch = () => {
    setSearchValue("");
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
            strokeMiterLimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          style={{
            fill: "none",
            stroke: "#000",
            strokeLinecap: "round",
            strokeMiterLimit: 10,
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
        placeholder="Search pizza...."
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />

      {searchValue && (
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
                strokeLineJoin: "round",
                strokeiWdth: "2px",
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
                strokeLineJoin: "round",
                strokeiWdth: "2px",
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
}
