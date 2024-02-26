import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Redux Toolkit imports
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";
import { setActivePage } from "../redux/slices/filterSlice";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const dispatch = useDispatch();
  const { activeCategory, activeSort, activePage } = useSelector(
    (state) => state.filterReducer
  );
  const { searchValue } = useContext(AppContext);
  const onChangePage = (number) => {
    dispatch(setActivePage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortInfo = sortList[activeSort].type;
    const filterBy = sortInfo.replace("-", "");
    const filterOrder = sortInfo.includes("-") ? "asc" : "desc";
    const filterCategory = activeCategory ? `&category=${activeCategory}` : "";

    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items?page=${activePage}&limit=4${filterCategory}&sortBy=${filterBy}&order=${filterOrder}`;

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
  }, [activeCategory, activeSort, searchValue, activePage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading ? fakeCards : pizzasItems}
      </div>

      <Pagination {...{ onChangePage }} />
    </div>
  );
}
