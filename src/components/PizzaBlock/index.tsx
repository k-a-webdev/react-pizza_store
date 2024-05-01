// Main imports
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Redux Toolkit imports
import { useSelector } from 'react-redux';
import { ICartItem } from '../../redux/cart/types';
import { addProduct } from '../../redux/cart/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Types
type PizzaBlockProps = {
  title: string;
  title_en: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  id: number;
};

// Main block
export const PizzaBlock: FC<PizzaBlockProps> = ({
  title,
  title_en,
  price,
  imageUrl,
  types,
  sizes,
  id,
}) => {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const { t, i18n } = useTranslation();
  const typeNames = t('pizza.typeNames', { returnObjects: true }) as string[];

  // Redux logic
  const dispatch = useAppDispatch();
  const { priceUSD } = useSelector((state: RootState) => state.cartReducer);
  const cartPizza = useSelector((state: RootState) =>
    state.cartReducer.products.find(
      (el) => el.id === id && el.size === activeSize && el.type === activeType,
    ),
  );

  const onClickAdd = () => {
    const pizza: ICartItem = {
      id,
      title,
      title_en,
      price,
      imageUrl,
      type: activeType,
      size: activeSize,
      count: 0,
    };

    dispatch(addProduct(pizza));
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      <Link to={`pizza/${id}`}>
        <img className="w-64" src={imageUrl} alt="Pizza" />
        <h4 className="text-xl font-black my-2.5">
          {i18n.resolvedLanguage === 'en-US' ? title_en : title}
        </h4>
      </Link>

      <div className="w-[calc(100%-2.5rem)] max-w-96 flex flex-col bg-background-pizzaSelector rounded-xl p-1.5">
        <ul className="flex flex-row flex-1 mb-1.5">
          {types.map((type, i) => {
            return (
              <li
                onClick={() => setActiveType(type)}
                className={twMerge(
                  clsx(
                    'p-2 flex-1 cursor-pointer font-semibold text-base',
                    activeType === type && 'bg-white shadow cursor-auto rounded-md',
                  ),
                )}
                key={type}
              >
                {typeNames[type]}
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-row">
          {sizes.map((size) => {
            return (
              <li
                onClick={() => setActiveSize(size)}
                className={twMerge(
                  clsx(
                    'p-2 flex-[1] cursor-pointer font-semibold text-base',
                    activeSize === size && 'bg-white shadow cursor-auto rounded-md',
                  ),
                )}
                key={size}
              >
                {size} {t('pizza.size')}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex w-[calc(100%-2.5rem)] max-w-96 items-center justify-between mt-4">
        <div className="font-bold text-2xl leading-7 tracking-wide">
          {i18n.resolvedLanguage === 'en-US'
            ? `from ${Math.ceil(price / priceUSD)} $`
            : `від ${price} ₴`}
        </div>
        <button
          className="btn-primary group bg-white border border-myOrange text-myOrange hover:bg-myOrange hover:text-white flex items-center"
          onClick={onClickAdd}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 fill-myOrange"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
              className="fill-current"
            />
          </svg>
          <span className="font-semibold text-base">{t('button.pizzaAdd')}</span>
          {cartPizza && (
            <i className="inline-block rounded-full bg-myOrange text-white font-semibold w-6 h-6 not-italic text-sm flex justify-center items-center ml-2 group-hover:bg-white group-hover:text-myOrange">
              {cartPizza.count}
            </i>
          )}
        </button>
      </div>
    </div>
  );
};
