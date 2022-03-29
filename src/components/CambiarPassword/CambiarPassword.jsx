import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./CambiarPassword.module.css";
import { UserContext } from "../../Context/UserContext";

const CambiarPassword = (props) => {
  const { userc } = useContext(UserContext);
  var id = userc.idUsuario;
  var nombreU = sessionStorage.getItem("nombreUsuario");
  var token = userc.tokenUsuario;
  const [password, setPassword] = useState("");
  const [vpassword, setVpassword] = useState("");

  const handleSubmitr = async (e) => {
    e.preventDefault();
    if (password === vpassword) {
      await updatePassword();
      alert("Password Actualizado");
      props.history.push("/");
    } else {
      alert("Los Passwords introducidos no son iguales");
    }
  };

  const updatePassword = async () => {
    try {
      return fetch(
        "https://backend-tienda-proy5.herokuapp.com/api/usuarios/actpassword",
        {
          method: "POST",
          body: JSON.stringify({ id, password }), // data {object}
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
    }
  };
  const saliraperfil = () => {
    props.history.push("/perfildeusuario");
  };

  return (
    <>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Cambiar Password</h2>
        <form className={styles.formato} onSubmit={handleSubmitr}>
          <div className={styles.fullentry}>
            <label htmlFor="validationCustom01" className={styles.formlabel}>
              Nombre
            </label>
            <input
              readOnly
              type="text"
              className={styles.formcontrol}
              id="inputNombre"
              value={nombreU}
            />
          </div>
          <div className={styles.fullentry}>
            <label
              htmlFor="validationCustomUsername"
              className={styles.formlabel}>
              Introducir Nuevo Password
            </label>
            <input
              type="password"
              className={styles.formcontrol}
              id="inputPassword1"
              aria-describedby="inputGroupPrepend"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.fullentry}>
            <label
              htmlFor="validationCustomUsername"
              className={styles.formlabel}>
              Repetir Nuevo Password
            </label>
            <input
              type="password"
              className={styles.formcontrol}
              id="inputPasswordv"
              aria-describedby="inputGroupPrepend"
              placeholder="Password"
              required
              value={vpassword}
              onChange={(e) => {
                setVpassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.contenBoton}>
            <button
              className={styles.boton}
              type="button"
              onClick={saliraperfil}>
              Cancelar
            </button>
            <button className={styles.boton} type="submit">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(CambiarPassword);
