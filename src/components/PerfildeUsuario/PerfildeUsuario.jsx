import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./PerfildeUsuario.module.css";
import { UserContext } from "../../Context/UserContext";

function PerfildeUsuario(props) {
  const { userc  } = useContext(UserContext);
  var id = userc.idUsuario;
  var nombreU = sessionStorage.getItem("nombreUsuario");
  var usernameU = sessionStorage.getItem("cuentaUsuario");
  var correoU = sessionStorage.getItem("correoUsuario");
  var token = userc.tokenUsuario;
  const [editar, setEditar] = useState(false);
  const [nombre, setNombre] = useState(nombreU);
  const [email, setEmail] = useState(correoU);

  const handleSubmitr = async (e) => {
    e.preventDefault();
    await updateRegistro();
    setNombre(nombreU);
    setEmail(correoU);
    setEditar(false);
  };

  const updateRegistro = async () => {
    try {
      return fetch("https://backend-tienda-proy5.herokuapp.com/api/usuarios/actualizar", {
        method: "POST",
        body: JSON.stringify({ id, nombre, email }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          nombreU = response.data.nombre;
          sessionStorage.setItem("nombreUsuario", nombreU);
          correoU = response.data.email;
          sessionStorage.setItem("correoUsuario", correoU);
          alert("Registro Actualizado");
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
    }
  };

  const editarUsuario = () => {
    return setEditar(true);
  };

  const cancel = () => {
    return setEditar(false);
  };

  const actualizarPassword = () => {
    props.history.push("/cambiarpassword");
  };

  const salir = () => {
    props.history.push("/");
  };

  return (
    <>
      {!editar ? (
        <div className={styles.contenedor}>
          <h2 className={styles.titulo}>Perfil del Usuario</h2>
          <form className={styles.formato}>
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
              <label htmlFor="validationCustom02" className={styles.formlabel}>
                E-mail
              </label>
              <input
                readOnly
                type="email"
                className={styles.formcontrol}
                id="inputEmail"
                value={correoU}
              />
            </div>

            <div className={styles.fullentry}>
              <label
                htmlFor="validationCustomUsername"
                className={styles.formlabel}>
                Username
              </label>
              <input
                readOnly
                type="text"
                className={styles.formcontrol}
                id="inputUsername"
                aria-describedby="inputGroupPrepend"
                placeholder="Username"
                required
                value={usernameU}
              />
            </div>

            <div className={styles.contenBoton}>
              <button className={styles.boton} type="button" onClick={salir}>
                Salir
              </button>
              <button
                className={styles.boton}
                type="button"
                onClick={editarUsuario}>
                Editar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.contenedor}>
          <h2 className={styles.titulo}>Perfil del Usuario</h2>
          <form className={styles.formato} onSubmit={handleSubmitr}>
            <div className={styles.fullentry}>
              <label htmlFor="validationCustom01" className={styles.formlabel}>
                Nombre
              </label>
              <input
                type="text"
                className={styles.formcontrol}
                id="inputNombre"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>

            <div className={styles.fullentry}>
              <label htmlFor="validationCustom02" className={styles.formlabel}>
                E-mail
              </label>
              <input
                type="email"
                className={styles.formcontrol}
                id="inputEmail"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className={styles.fullentry}>
              <label
                htmlFor="validationCustomUsername"
                className={styles.formlabel}>
                Username
              </label>
              <input
                readOnly
                type="text"
                className={styles.formcontrol}
                id="inputUsername"
                aria-describedby="inputGroupPrepend"
                placeholder="Username"
                required
                value={usernameU}
              />
            </div>

            <div className={styles.contenBoton}>
              <button className={styles.boton} type="submit">
                Actualizar
              </button>

              <button className={styles.boton} type="button" onClick={cancel}>
                Cancelar
              </button>

              <button
                className={styles.boton}
                type="button"
                onClick={actualizarPassword}>
                Cambiar Password
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default withRouter(PerfildeUsuario);
