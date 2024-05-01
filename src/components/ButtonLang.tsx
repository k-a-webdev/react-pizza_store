import React from "react";
import { useTranslation } from "react-i18next";

export const ButtonLang: React.FC = () => {
  const langs = ["ua-UA", "en-US"];

  const { i18n } = useTranslation();

  const changeLangs = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex flex-row gap-2.5">
      {langs.map((el, i) => (
        <button
          className="btn-primary bg-white border border-myOrange text-myOrange hover:bg-myOrange hover:text-white"
          onClick={() => el !== i18n.resolvedLanguage && changeLangs(el)}
          key={el}
        >
          {el.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
