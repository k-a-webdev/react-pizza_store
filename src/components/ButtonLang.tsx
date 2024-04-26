import React from "react";
import { useTranslation } from "react-i18next";

export const ButtonLang: React.FC = () => {
  const langs = ["ua-UA", "en-US"];

  const { i18n } = useTranslation();

  const changeLangs = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      {langs.map((el, i) => (
        <button
          className="button button--outline button__lang"
          onClick={() => el !== i18n.resolvedLanguage && changeLangs(el)}
          key={el}
        >
          {el.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
