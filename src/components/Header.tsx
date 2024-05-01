// Main imports
import { FC, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Redux imports
import { useSelector } from "react-redux";
import { selectCart } from "../redux/cart/selectors";

// My components
import { ButtonLang, Search } from "../components";

// Asset imports
import logoSvg from "../assets/img/pizza-logo.svg";

// Main block
export const Header: FC = () => {
  const isMounted = useRef(false);

  const { products, totalPrice, totalCount, totalPrice_en } =
    useSelector(selectCart);

  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isMounted.current) {
      const productsJson = JSON.stringify(products);
      localStorage.setItem("cart", productsJson);
    }

    isMounted.current = true;
  }, [products]);

  return (
    <header className="py-3 px-4 md:py-10 md:px-16 border-b border-myGray-1">
      <div className="flex flex-col xl:flex-row items-center gap-2.5 w-full xl:justify-between">
        <div className="flex flex-col gap-2.5 items-center md:flex-row md:gap-10 xl:w-full">
          <Link to={process.env.REACT_APP_DOMAIN ? process.env.REACT_APP_DOMAIN : "/"}>
            <div className="flex">
              <img width="38" src={logoSvg} alt="Pizza logo" className="mr-3.5" />
              <div>
                <h1 className="text-text-black text-2xl uppercase font-extrabold">Pizza store</h1>
                <p className="text-text-gray">{t("header.subTitle")}</p>
              </div>
            </div>
          </Link>
  
          {location.pathname === process.env.REACT_APP_DOMAIN && <Search />}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 items-center xl:justify-items-end">
          <Link to="cart" className="btn-primary bg-myOrange border divide-transparent hover:brightness-[93%] active:brightness-[90%] active:translate-y-0.5">
            <span>
              {i18n.resolvedLanguage === "en-US"
                ? `${totalPrice_en} $`
                : `${totalPrice} ₴`}
            </span>
            <div className="w-0.5 h-6 mx-3.5 bg-background-gray"></div>

            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-1.5">{totalCount}</span>
          </Link>
        
          <ButtonLang />
        </div>
      </div>
    </header>
  );
};
