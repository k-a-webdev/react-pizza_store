import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="316" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="425" rx="10" ry="10" width="125" height="27" />
    <rect x="148" y="417" rx="30" ry="30" width="132" height="42" />
  </ContentLoader>
);
