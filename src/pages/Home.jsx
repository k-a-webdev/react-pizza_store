import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

// Redux Toolkit imports
import { useDispatch, useSelector } from "react-redux";
import { setActivePage, setFilters } from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false); // To check if there was a first render

  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const { activeCategory, activeSort, activePage } = useSelector(
    (state) => state.filterReducer
  );
  const { searchValue } = useContext(AppContext);
  const onChangePage = (number) => {
    dispatch(setActivePage(number));
  };

  // Pizzas
  const pizzas = useSelector((state) => state.pizzasReducer.items);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const sortInfo = sortList[activeSort].type;
    const filterBy = sortInfo.replace("-", "");
    const filterOrder = sortInfo.includes("-") ? "asc" : "desc";
    const filterCategory = activeCategory ? `&category=${activeCategory}` : "";

    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items?page=${activePage}&limit=4${filterCategory}&sortBy=${filterBy}&order=${filterOrder}`;

    try {
      const { data } = await axios.get(mainURL);
      dispatch(setItems(data));
    } catch (error) {
      console.log("Request data error\n", error);
      alert("Request data error!");
    } finally {
      setIsLoading(false);
    }
  };

  // At the first rendering, we check the url parameters and, if available, record them in the editor
  useEffect(() => {
    const urlParams = window.location.search;
    if (urlParams) {
      const params = qs.parse(urlParams.substring(1));

      const sort = sortList.findIndex((el, i) => {
        if (
          el.type === `${params.order === "asc" ? "-" : ""}${params.sortBy}`
        ) {
          return true;
        } else return false;
      });

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const sortInfo = sortList[activeSort].type;
      const queryString = qs.stringify({
        sortBy: sortInfo.replace("-", ""),
        order: sortInfo.includes("-") ? "asc" : "desc",
        category: activeCategory,
        page: activePage,
      });

      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }

    window.scrollTo(0, 0);

    // To check if params from url or from client. If from url fetchPizzas() executed in useEffect when the page is loaded, else fetchPizzas() executed there
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [activeCategory, activeSort, searchValue, activePage]);

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

      <Pagination {...{ onChangePage, activePage }} />
    </div>
  );
}
