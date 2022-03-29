import React, { useState } from 'react'
import styles from './Registro.module.css'

export const Registro = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmitr = async (e) => {
    e.preventDefault()

    await enviarRegistro()
    setNombre('')
    setEmail('')
    setUsername('')
    setPassword('')
    alert('Registro Enviado')
  }

  const enviarRegistro = async () => {
    try {
      return fetch('https://backend-tienda-proy5.herokuapp.com/api/usuarios', {
        method: 'POST',
        body: JSON.stringify({ nombre, email, username, password }), // data {object}
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
        })
    } catch (e) {
      console.log('hubo un error')
      console.log(e)
    }
  }

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Registro</h2>
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
            placeholder="Nombre"
            onChange={(e) => {
              setNombre(e.target.value)
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
            placeholder="Correo electronico"
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>

        <div className={styles.fullentry}>
          <label
            htmlFor="validationCustomUsername"
            className={styles.formlabel}
          >
            Username
          </label>
          <input
            type="text"
            className={styles.formcontrol}
            id="inputUsername"
            aria-describedby="inputGroupPrepend"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>

        <div className={styles.fullentry}>
          <label
            htmlFor="validationCustomUsername"
            className={styles.formlabel}
          >
            Password
          </label>
          <input
            type="password"
            className={styles.formcontrol}
            id="inputPassword"
            aria-describedby="inputGroupPrepend"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <div className={styles.contenBoton}>
          <button className={styles.boton} type="submit">
            Registrar datos
          </button>
        </div>
      </form>
    </div>
  )
}
