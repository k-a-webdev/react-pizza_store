import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ICartItem, addProduct } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

type PizzaBlockProps = {
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  id: number;
};

const PizzaBlock: FC<PizzaBlockProps> = ({
  title,
  price,
  imageUrl,
  types,
  sizes,
  id,
}) => {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const typeNames = ["тонка", "традиційна"];

  // Redux
  const dispatch = useDispatch();
  const cartPizza = useSelector((state: RootState) =>
    state.cartReducer.products.find(
      (el) =>
        el.id === id &&
        el.size === activeSize &&
        el.type === typeNames[activeType]
    )
  );

  const onClickAdd = () => {
    const pizza: ICartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: activeSize,
      count: 0,
    };

    dispatch(addProduct(pizza));
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => {
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
          {sizes.map((size) => {
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
        <div className="pizza-block__price">від {price} ₴</div>
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
  );
};

export default PizzaBlock;