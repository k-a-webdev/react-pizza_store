import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components";

const MainLayout: FC = () => {
  return (
    <div className="h-full bg-background-page p-2.5 sm:py-12 sm:px-11 font-Nunito">
      <div className="mx-auto bg-white rounded-xl">
        <Header />
        <div className="py-3 px-4 md:py-10 md:px-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
