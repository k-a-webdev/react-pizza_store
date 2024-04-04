import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FullPizza() {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://64e6234909e64530d17fa566.mockapi.io/items/?id=${id}`)
      .then(({ data }) => setPizza(data[0]))
      .catch((error) => {
        console.log(error);
        alert("Error while receiving pizza");

        navigate("/");
      });
  }, []);

  if (pizza.length === 0) {
    return <div className="container">Loading....</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₴</h4>
    </div>
  );
}
