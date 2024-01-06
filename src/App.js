import { useEffect, useState } from "react";
import axios from "axios";

import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

export default function App() {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = () => {
    const mainURL = `https://64e6234909e64530d17fa566.mockapi.io/items`;

    axios.get(mainURL).then((res) => {
      setPizzas(res.data);
    });
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

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
            {pizzas.map((el) => {
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
