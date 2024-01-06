import { useState } from "react";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categorieList = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategory = (index) => {
    setActiveCategory(index);
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
}

// TODO
// - add all categories in list and list.map((el, i) => return(<li onClick={...} className={...}>{el}</li>))
