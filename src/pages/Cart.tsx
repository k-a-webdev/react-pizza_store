// Main imports
import { FC } from "react";
import { useTranslation } from "react-i18next";

// Redux Toolkit
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { clearCart } from "../redux/cart/slice";
import { selectCart } from "../redux/cart/selectors";

// My components
import { CartItem, CartEmpty, ButtonHome } from "../components";

// Main block
const Cart: FC = () => {
  const { products, totalPrice, totalCount, totalPrice_en } =
    useSelector(selectCart);

  const dispatcher = useAppDispatch();
  const { t, i18n } = useTranslation();

  if (!products.length) {
    return <CartEmpty />;
  }

  return (
    <div className="py-3 px-4 md:py-10 md:px-16">
      <div className="mx-auto max-w-205">
        <div className="flex flex-col items-start gap-5 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center font-extrabold text-4xl">
            {t("cart.pageTitle")}
          </h2>
          <div
            className="flex items-center cursor-pointer transition duration-150 easy-in-out opacity-50 hover:opacity-100"
            onClick={() => {
              if (window.confirm(t("cart.clearCartConfirm")))
                dispatcher(clearCart());
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1.5"
            >
              <path
                d="M2.5 5H4.16667H17.5"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33337 9.16667V14.1667"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6666 9.16667V14.1667"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-lg">{t("button.cartClear")}</span>
          </div>
        </div>
        <div className="flex flex-col">
          {products.map((el, i: number) => {
            return <CartItem {...el} key={i} />;
          })}
        </div>
        <div className="my-12">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-2xl sm:text-xl">
              {t("cart.countLabel")}{" "}
              <b>
                {totalCount} {t("cart.countSubLabel")}
              </b>
            </span>
            <span className="text-2xl sm:text-xl">
              {" "}
              {t("cart.priceLabel")}
              <b className="text-myOrange">
                {i18n.resolvedLanguage === "en-US"
                  ? `${totalPrice_en} $`
                  : `${totalPrice} ₴`}
              </b>{" "}
            </span>
          </div>
          <div className="flex flex-col-reverse gap-5 items-center mt-10 sm:flex-row sm:justify-between">
            <ButtonHome />
            <div className="btn-primary w-full text-2xl font-semibold w-52 p-4 bg-myOrange border divide-transparent hover:brightness-[90%] active:brightness-[85%] active:translate-y-0.5 sm:min-w-fit sm:w-fit">
              <span>{t("button.payNow")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
