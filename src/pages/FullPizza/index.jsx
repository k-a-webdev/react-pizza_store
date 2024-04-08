import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addProduct } from "../../redux/slices/cartSlice";

import styles from "./Profile.module.scss";

export default function FullPizza() {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState({});
  const { id } = useParams();

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ["тонка", "традиційна"];
  const dispatch = useDispatch();
  const cartPizza = useSelector((state) =>
    state.cartReducer.products.find(
      (el) =>
        el.id === id &&
        el.size === activeSize &&
        el.type === typeNames[activeType]
    )
  );

  const onClickAdd = () => {
    const selectedPizza = {
      id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: activeSize,
    };

    dispatch(addProduct(selectedPizza));
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

  if (pizza.length === 0) {
    return <div className="container">Loading....</div>;
  }

  return (
    <div className="container">
      <div className={styles.profile}>
        <div className={styles.profile__img}>
          <img src={pizza.imageUrl} alt="Pizza" />
        </div>
        <div className={styles.profile__info}>
          <h1>{pizza.title}</h1>
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
                      {size} см.
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{pizza.price} ₴</div>
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
              <span>Додати</span>
              {cartPizza && <i>{cartPizza.count}</i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
