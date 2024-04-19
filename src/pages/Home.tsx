import { FC, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { setActivePage, setFilters } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizzas/asyncActions";

// My omponents
import {
  Categories,
  Sort,
  sortList,
  PizzaBlock,
  Skeleton,
  Pagination,
  GetPizzasError,
} from "../components";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false); // To check if there was a first render

  // Filters
  const { activeCategory, activeSort, activePage } = useSelector(
    (state: RootState) => state.filterReducer
  );
  const searchValue = useSelector(selectFilter).searchValue;
  const onChangePage = useCallback((number: number) => {
    dispatch(setActivePage(number));
  }, []);

  // Pizzas
  const pizzas = useSelector((state: RootState) => state.pizzasReducer.items);
  const isLoading = useSelector(
    (state: RootState) => state.pizzasReducer.isLoading
  );

  const getPizzas = () => {
    const sortInfo = sortList[activeSort].type;
    const filterBy = sortInfo.replace("-", "");
    const filterOrder = sortInfo.includes("-") ? "asc" : "desc";
    const filterCategory = activeCategory ? `&category=${activeCategory}` : "";

    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items?page=${activePage}&limit=4${filterCategory}&sortBy=${filterBy}&order=${filterOrder}`;

    dispatch(fetchPizzas(mainURL));
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
          activeCategory: Number(params.category),
          activeSort: sort,
          activePage: Number(params.page),
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
      getPizzas();
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
        <Sort {...{ activeSort }} />
      </div>
      {isLoading !== "error" ? (
        <>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {isLoading === "loading"
              ? fakeCards
              : isLoading === "success"
              ? pizzasItems
              : null}
          </div>
          <Pagination {...{ onChangePage, activePage }} />
        </>
      ) : (
        <GetPizzasError />
      )}
    </div>
  );
};

export default Home;
