// Main imports
import { FC, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import qs from "qs";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { setActivePage, setFilters } from "../redux/filter/slice";
import { fetchAllPizzas, fetchPizzas } from "../redux/pizzas/asyncActions";

// My components
import {
  Categories,
  Sort,
  sortListType,
  PizzaBlock,
  Skeleton,
  Pagination,
  GetPizzasError,
} from "../components";

// Main block
const Home: FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
    const sortInfo = sortListType[activeSort].type;
    const filterBy = sortInfo.replace("-", "");
    const filterOrder = sortInfo.includes("-") ? "asc" : "desc";
    const filterCategory = activeCategory ? `&category=${activeCategory}` : "";

    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items?page=${activePage}&limit=8${filterCategory}&sortBy=${filterBy}&order=${filterOrder}`;

    dispatch(fetchPizzas(mainURL));

    const basicURL = `https://64e6234909e64530d17fa566.mockapi.io/items?${filterCategory}`;

    !searchValue && dispatch(fetchAllPizzas(basicURL)); // For dinamyc pagination must know how many pizzas
  };

  // At the first rendering, we check the url parameters and, if available, record them in the editor
  useEffect(() => {
    const urlParams = window.location.search;
    if (urlParams) {
      const params = qs.parse(urlParams.substring(1));

      const sort = sortListType.findIndex((el, i) => {
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

      getPizzas();
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const sortInfo = sortListType[activeSort].type;
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
    .filter((item) => {
      if (i18n.resolvedLanguage === "ua-UA")
        return item.title.toLowerCase().includes(searchValue.toLowerCase());
      else
        return item.title_en.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const fakeCards = new Array(8)
    .fill({})
    .map((_, index) => ({ id: index }))
    .map((el) => {
      return <Skeleton key={el.id} />;
    });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-4 flex-col xl:flex-row">
        <Categories />

        <Sort {...{ activeSort }} />
      </div>
      {isLoading !== "error" ? (
        <>
          <h2 className="m-8 font-extrabold text-4xl">{t("pizza.pageTitle")}</h2>
          <div className="grid grid-cols-myTempl gap-y-16 gap-x-8 justify-between">
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
