// Main imports
import { FC } from "react";
import { Link } from "react-router-dom";

// Redux Toolkit imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { addProduct, clearProducts, removeProduct } from "../redux/cart/slice";
import { ICartItem } from "../redux/cart/types";
import { useTranslation } from "react-i18next";

// Types
type CartItemsProps = {
  id: number;
  imageUrl: string;
  title: string;
  title_en: string;
  type: number;
  size: number;
  price: number;
  count: number;
};

// Main block
export const CartItem: FC<CartItemsProps> = ({
  id,
  imageUrl,
  title,
  title_en,
  type,
  size,
  price,
  count,
}) => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const { priceUSD } = useSelector((state: RootState) => state.cartReducer);

  const typeNames = t("pizza.typeNames", { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col w-full border-t border-myGray-1 pt-6 mt-6 lg:flex-row lg:justify-between">
      <Link to={`pizza/${id}`} className="flex flex-col items-center sm:flex-row sm:justify-start">
        <div className="flex items-center mr-4">
          <img className="w-32 sm:w-40 md:w-24 lg:w-20" src={imageUrl} alt="Pizza" />
        </div>

        <div className="text-center sm:text-start">
          <h3 className="font-bold text-2xl leading-7 tracking-wide">{i18n.resolvedLanguage === "en-US" ? title_en : title}</h3>
          <p className="text-xl text-myGray-4">
            {typeNames[type]}, {size} {t("pizza.size")}
          </p>
        </div>
      </Link>

      <div className="flex flex-col mb-5 sm:flex-row sm:justify-center sm:gap-10">
        <div className="flex items-center justify-between my-5 sm:gap-10">
          <button
            disabled={count === 1}
            className="btn-primary min-w-fit w-fit p-2.5 border-[2px] bg-white border border-myOrange text-myOrange hover:bg-myOrange hover:text-white disabled:cursor-default disabled:opacity-40 disabled:border-myGray-3 disabled:text-myGray-3 disabled:hover:bg-myGray-3 disabled:hover:text-white"
            onClick={() =>
              dispatch(
                removeProduct({
                  id,
                  type,
                  size,
                  price,
                } as ICartItem)
              )
            }
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                className="fill-current"
              />
            </svg>
          </button>

          <b className="text-2xl sm:text-xl">{count}</b>

          <button
            className="btn-primary min-w-fit w-fit p-2.5 border-[2px] bg-white border border-myOrange text-myOrange hover:bg-myOrange hover:text-white"
            onClick={() =>
              dispatch(
                addProduct({
                  id,
                  type,
                  size,
                  price,
                  count,
                  title,
                  title_en,
                  imageUrl,
                })
              )
            }
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
                className="fill-current"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
                className="fill-current"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-row items-center justify-between text-2xl sm:text-xl sm:gap-10">
          <b className="font-bold tracking-wide">
            {i18n.resolvedLanguage === "en-US"
              ? `${Math.ceil((price * count) / priceUSD)} $`
              : `${price * count} ₴`}
          </b>

          <div className="flex items-center justify-center">
            <button
              className="btn-primary min-w-fit p-2.5 border border-[2px] border-black rotate-45 opacity-50 text-black hover:opacity-100 hover:bg-black hover:text-white"
              onClick={() => {
                if (window.confirm(t("cart.clearItemConfirm"))) {
                  dispatch(
                    clearProducts({
                      id,
                      type,
                      size,
                    } as ICartItem)
                  );
                }
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                  className="fill-current"
                />
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                  className="fill-current"
                />
              </svg>
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};
