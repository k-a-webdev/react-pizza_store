// Main imports
import { useEffect, useState, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

// Redux Toolkit imports
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { addProduct } from "../../redux/cart/slice";
import { PizzaItem } from "../../redux/pizzas/types";

// Styles
import styles from "./Profile.module.scss";

// My components
import { ButtonHome } from "../../components";

// Main block
export default function FullPizza(): ReactElement {
  const [pizza, setPizza] = useState<PizzaItem>();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { id } = useParams();

  const typeNames = t("pizza.typeNames", { returnObjects: true }) as string[];

  const { priceUSD } = useSelector((state: RootState) => state.cartReducer);
  const cartPizza = useSelector((state: RootState) =>
    state.cartReducer.products.find(
      (el) =>
        el.id === Number(id) && el.size === activeSize && el.type === activeType
    )
  );

  const onClickAdd = () => {
    if (pizza) {
      const selectedPizza = {
        id: Number(id),
        title: pizza.title,
        title_en: pizza.title_en,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        type: activeType,
        size: activeSize,
        count: 0,
      };

      dispatch(addProduct(selectedPizza));
    }
  };

  useEffect(() => {
    axios
      .get(`https://64e6234909e64530d17fa566.mockapi.io/items/?id=${id}`)
      .then(({ data }) => {
        setPizza(data[0]);

        setActiveType(data[0].types[0]);
        setActiveSize(data[0].sizes[0]);
      })
      .catch((error) => {
        console.log(error);
        alert("Error while receiving pizza");

        navigate("/");
      });
  }, []);

  if (!pizza) {
    return <div className="container">{t("loadPageText")}</div>;
  }

  return (
    <div className="container">
      <div className={styles.profile}>
        <div className={styles.profile__img}>
          <img src={pizza.imageUrl} alt="Pizza" />
        </div>
        <div className={styles.profile__info}>
          <h1>
            {i18n.resolvedLanguage === "en" ? pizza.title_en : pizza.title}
          </h1>
          <div className={`pizza-block__selector ${styles.details}`}>
            <ul>
              {Object.keys(pizza).length > 0 &&
                pizza.types.map((type) => {
                  return (
                    <li
                      onClick={() => setActiveType(type)}
                      className={activeType === type ? "active" : ""}
                      key={type}
                    >
                      {typeNames[type]}
                    </li>
                  );
                })}
            </ul>
            <ul>
              {Object.keys(pizza).length > 0 &&
                pizza.sizes.map((size) => {
                  return (
                    <li
                      onClick={() => setActiveSize(size)}
                      className={activeSize === size ? "active" : ""}
                      key={size}
                    >
                      {size} {t("pizza.size")}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">
              {i18n.resolvedLanguage === "en"
                ? `${Math.ceil(pizza.price / priceUSD)} $`
                : `${pizza.price} ₴`}
            </div>
            <button
              className="button button--outline button--add"
              onClick={onClickAdd}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>{t("button.pizzaAdd")}</span>
              {cartPizza && <i>{cartPizza.count}</i>}
            </button>
          </div>
        </div>
      </div>

      <ButtonHome />
    </div>
  );
}
