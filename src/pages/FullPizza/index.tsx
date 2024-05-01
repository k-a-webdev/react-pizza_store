// Main imports
import { useEffect, useState, ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Redux Toolkit imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addProduct } from '../../redux/cart/slice';
import { PizzaItem } from '../../redux/pizzas/types';

// Styles
import styles from './Profile.module.scss';

// My components
import { ButtonHome } from '../../components';
import Preloader from '../Preloader';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Main block
export default function FullPizza(): ReactElement {
  const [pizza, setPizza] = useState<PizzaItem>();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { id } = useParams();

  const typeNames = t('pizza.typeNames', { returnObjects: true }) as string[];

  const { priceUSD } = useSelector((state: RootState) => state.cartReducer);
  const cartPizza = useSelector((state: RootState) =>
    state.cartReducer.products.find(
      (el) => el.id === Number(id) && el.size === activeSize && el.type === activeType,
    ),
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
        alert('Error while receiving pizza');

        navigate('/');
      });
  }, []);

  if (!pizza) {
    return (
      <div className="py-3 px-4 md:py-10 md:px-16">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="py-3 px-4 md:py-10 md:px-16">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-3 w-full items-center lg:flex-row">
          <img src={pizza.imageUrl} alt="Pizza" className="max-w-[22.5rem] w-full md:w-auto" />
          <div className="w-full text-center inline-flex flex-col gap-3">
            <h1 className="font-bold text-2xl">
              {i18n.resolvedLanguage === 'en-US' ? pizza.title_en : pizza.title}
            </h1>
            <div className="w-full lg:w-50% flex flex-col bg-background-pizzaSelector rounded-xl p-1.5">
              <ul className="flex flex-row flex-1 mb-1.5">
                {pizza.types.map((type, i) => {
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
                {pizza.sizes.map((size) => {
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
            <div className="w-full flex items-center justify-between mt-4">
              <div className="font-bold text-2xl leading-7 tracking-wide">
                {i18n.resolvedLanguage === 'en-US'
                  ? `${Math.ceil(pizza.price / priceUSD)} $`
                  : `${pizza.price} ₴`}
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
        </div>

        <ButtonHome />
      </div>
    </div>
  );
}
