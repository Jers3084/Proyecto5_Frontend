import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styles from "./IniciarSesion.module.css";
import { UserContext } from "../../Context/UserContext";

const IniciarSesion = (props) => {
  const { userc, setUserc } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tokenS, setTokenS] = useState("");
  const [registro, setRegistro] = useState("");
  let tok = userc.tokenUsuario;

  useEffect(() => {
    setTokenS(tok);
    if (tokenS === "") {
      setRegistro("No se ha registrado");
    }
  }, [tokenS, tok]);

  const handleSubmitl = async (e) => {
    e.preventDefault();
    await enviarLogin();
    setUsername("");
    setPassword("");
  };

  const enviarLogin = async () => {
    try {
      fetch("https://backend-tienda-proy5.herokuapp.com/api/usuarios/login", {
        method: "POST",
        body: JSON.stringify({ username, password }), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            const tokenU = response.data.token;
            const cUsuario = response.data.user.username;
            const nombre = response.data.user.nombre;
            const correo = response.data.user.email;
            userc.tokenUsuario = tokenU;
            sessionStorage.setItem("cuentaUsuario", cUsuario);
            sessionStorage.setItem("nombreUsuario", nombre);
            sessionStorage.setItem("correoUsuario", correo);
            userc.idUsuario = response.data.user._id;
            userc.token = true;
            setUserc({ ...userc });
            setUsername("");
            setPassword("");
            props.history.push("/");
          } else {
            alert("usuario o password erroneos");
          }
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
      alert("Error de autenticacion");
    }
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Iniciar Sesión</h2>
      <form className={styles.formato} onSubmit={handleSubmitl}>
        <div className={styles.fullentry}>
          <label htmlFor="userN" className={styles.formlabel}>
            Nombre de Usuario:
          </label>
          <input
            type="text"
            className={styles.formcontrol}
            id="userN"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={styles.fullentry}>
          <label htmlFor="inputPassword" className={styles.formlabel}>
            Password
          </label>
          <input
            type="password"
            className={styles.formcontrol}
            id="inputPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.contenBoton}>
          <button type="submit" className={styles.boton}>
            Iniciar Sesion
          </button>
          {<p>{registro}</p>}
        </div>
      </form>
    </div>
  );
};

export default withRouter(IniciarSesion);
