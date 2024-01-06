import { useEffect, useState } from "react";
import axios from "axios";

import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";

export default function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);
    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items`;

    axios.get(mainURL).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fakeCards = new Array(8).fill({}).map((_, index) => ({ id: index }));

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? fakeCards.map((el) => {
                  return <Skeleton key={el.id} />;
                })
              : pizzas.map((el) => {
                  return <PizzaBlock {...el} key={el.id} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO:
// - change language to English
