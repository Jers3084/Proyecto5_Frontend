import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import styles from "./Carrito.module.css";

const Carrito = (props) => {
  const { userc, setUserc } = useContext(UserContext);
  var tokencar = userc.tokenUsuario;
  var itemkey = 10;
  var importe = 0;

  const pagar = () => {
    if (tokencar === "") {
      alert("Debe Iniciar Sesion");
      props.history.push("/iniciarsesion");
    }
    const body = { articulos: [] };
    userc.shopping.forEach((p) => {
      const add = { nombre: p.nombre, precio: p.precio, cantidad: p.cantidad };
      body.articulos.push(add);
    });

    console.log(body);
    fetch("https://backend-tienda-proy5.herokuapp.com/api/pagos", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.success) {
          mostrarMP(response.data);
        }
      });
  };

  const mostrarMP = (token) => {
    //eslint-disable-next-line no-undef
    const mp = new MercadoPago("TEST-1cf2d8d5-e9f6-4804-9413-8c95219fa0e1", {
      locale: "es-MX",
    });

    // Inicializa el checkout
    mp.checkout({
      preference: {
        id: token,
      },
      render: {
        container: ".cho-container", // Indica el nombre de la clase donde se mostrará el botón de pago
        label: "Pagar", // Cambia el texto del botón de pago (opcional)
      },
    });
  };

  const borrar = (item) => {
    userc.shopping.splice(item, 1);
    userc.cantidad = userc.cantidad - item.cantidad;
    setUserc({ ...userc });
  };

  return (
    <div className={styles.contenedor}>
      <h3>Carrito de compras</h3>
      <div key={50} className={styles.subcontenedor}>
        <div className={styles.list_nombre}>Nombre</div>
        <div className={styles.list_precio}>Precio</div>
        <div className={styles.list_cantidad}>Cantidad</div>
        <div className={styles.list_importe}>Importe</div>
        <div className={styles.contenedorBoton}>Eliminar</div>
      </div>

      <div className={styles.subcontenedor}>
        {userc.shopping.map((x) => {
          itemkey = itemkey + 1;
          importe = importe + x.precio * x.cantidad;
          return (
            <>
              <div key={x.index} className={styles.list_nombre}>
                {x.nombre}
              </div>
              <div key={x.index + 50} className={styles.list_precio}>
                {x.precio}
              </div>
              <div key={x.index + 100} className={styles.list_cantidad}>
                {x.cantidad}
              </div>
              <div key={x.index + 150} className={styles.list_importe}>
                {x.precio * x.cantidad}
              </div>
              <div key={x.index + 200} className={styles.contenedorBoton}>
                <button
                  type="button"
                  className={styles.boton}
                  onClick={() => borrar(x)}>
                  Eliminar
                </button>
              </div>
            </>
          );
        })}
      </div>

      <div className={styles.subcontenedor}>
        <div className={styles.list_nombre}></div>
        <div className={styles.list_precio}></div>
        <div className={styles.list_cantidad}>Total:</div>
        <div className={styles.list_importe}>{importe}</div>
        <div className={styles.contenedorBoton}></div>
      </div>
      <div className={styles.buttoncontainer}>
        <button type="button" className="btn btn-success" onClick={pagar}>
          Proceder
        </button>
        <div className="cho-container"></div>
      </div>
    </div>
  );
};
export default withRouter(Carrito);
