import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import styles from "./Card.module.css";

export const Card = (props) => {
  const { userc, setUserc } = useContext(UserContext);
  var [cont, setCont] = useState(1);

  const sumar = () => {
    const exist = props.stock;
    if (cont >= exist) {
      return;
    }
    setCont(cont + 1);
  };

  const restar = () => {
    if (cont <= 1) {
      return;
    }
    setCont(cont - 1);
  };

  function agregar() {
    var found = false;
    userc.shopping.map((x) => {
      if (x.codigo === props.codigo) {
        x.cantidad = x.cantidad + cont;
        userc.cantidad = userc.cantidad + cont;
        setUserc({ ...userc });
        found = true;
      }
      return found;
    });
    if (!found) {
      var conse = userc.index;
      const add = {
        codigo: props.codigo,
        nombre: props.nombre,
        descripcion: props.descripcion,
        imagen: props.imagen,
        precio: props.precio,
        stock: props.stock,
        cantidad: cont,
        index: conse,
      };
      userc.shopping.push(add);
      conse = conse + 1;
      userc.index = conse;
      userc.cantidad = userc.cantidad + cont;
      setUserc({ ...userc });
    }
    return;
  }

  return (
    <div className="col">
      <div className="card h-100">
        <img src={props.imagen} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.nombre}</h5>
          <p className="card-text">{props.descripcion}</p>
        </div>
        <div className={styles.footer}>
          <button type="button" className="btn btn-primary" onClick={agregar}>
            Agregar
          </button>
          <div>
            <button
              type="button"
              className={styles.boton_mas_menos}
              onClick={restar}>
              -
            </button>
            <input
              type="number"
              className={styles.inputcantidad}
              readOnly
              value={cont}
            />
            <button
              type="button"
              className={styles.boton_mas_menos}
              onClick={sumar}>
              +
            </button>
          </div>
          <p className={styles.precio}> Precio: {props.precio}</p>
        </div>
      </div>
    </div>
  );
};
