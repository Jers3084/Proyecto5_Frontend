import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import styles from "./Catalogo.module.css";

export const Catalogo = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    await fetch("https://backend-tienda-proy5.herokuapp.com/api/productos")
      .then((resp) => resp.json())
      .then((value) => {
        if (value.success) {
          setProducts(value.data);
          //console.log(value.data);
        }
      });
  };

  return (
    <>
      <div className={styles.contenedor}>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          {products.map((x) => {
            return <Card key={x._id} {...x} />;
          })}
        </div>
      </div>
    </>
  );
};
