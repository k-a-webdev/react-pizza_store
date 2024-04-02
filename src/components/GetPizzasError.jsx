export default function GetPizzasError() {
  return (
    <div className="cart cart--empty">
      <h2>
        При завантаженні даних виникла помилка <icon>😕</icon>
      </h2>
      <p>
        Скоріше за все, сервіс скоро відновиться.
        <br />
        Просимо зачекати!
      </p>
    </div>
  );
}
