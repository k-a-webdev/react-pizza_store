import { useEffect, useState } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

export default function Home({ searchValue }) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [activeSort, setActiveSort] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortInfo = sortList[activeSort].type;
    const filterBy = sortInfo.replace("-", "");
    const filterOrder = sortInfo.includes("-") ? "asc" : "desc";
    const filterCategory = activeCategory ? `category=${activeCategory}` : "";

    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items?${filterCategory}&sortBy=${filterBy}&order=${filterOrder}`;

    axios.get(mainURL).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
  };

  const pizzasItems = pizzas
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const fakeCards = new Array(8)
    .fill({})
    .map((_, index) => ({ id: index }))
    .map((el) => {
      return <Skeleton key={el.id} />;
    });

  useEffect(() => {
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories {...{ activeCategory, setActiveCategory }} />
        <Sort {...{ activeSort, setActiveSort }} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading ? fakeCards : pizzasItems}
      </div>
    </div>
  );
}
