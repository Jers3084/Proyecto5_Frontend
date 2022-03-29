import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { UserContext } from '../../Context/UserContext'
import flag from './Img/Bandera.png'

export const Navbar = () => {
  const { userc, setUserc } = useContext(UserContext)
  var usuario = sessionStorage.getItem('cuentaUsuario')

  const logout = () => {
    sessionStorage.setItem('tokenUsuario', null)
    sessionStorage.setItem('cuentaUsuario', null)
    sessionStorage.setItem('nombreUsuario', null)
    sessionStorage.setItem('correoUsuario', null)
    sessionStorage.setItem('idUsuario', null)
    userc.token = false
    setUserc({ ...userc })
  }

  return (
    <>
      <nav className={styles.navbar} id={styles.menu}>
        <ul className={styles.ul}>
          <li className={styles.img}></li>
          <li className={styles.li}>
            <Link to="/" className={styles.link}>
              Nosotros
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/catalogo" className={styles.link}>
              Productos
            </Link>
          </li>
          <li className={styles.li}>
            <Link to="/carrito" className={styles.link}>
              Carrito {userc.cantidad}
            </Link>
          </li>
          <li className={styles.space}>
            <img src={flag} alt="" style={{ width: '30px' }} /> Moneda Pesos Mx
          </li>
          <li className={styles.li_submenu}>
            {userc.token ? (
              <>
                <Link to="#" className={styles.dropdown}>
                  Usuario: {usuario}
                </Link>
                <ul>
                  <li className={styles.li_dropdown}>
                    <Link to="/perfildeusuario" className={styles.link}>
                      Perfil de Usuario
                    </Link>
                  </li>
                  <li className={styles.li_dropdown}>
                    <Link className={styles.link} to="#" onClick={logout}>
                      Cerrar Sesion
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/iniciarsesion" className={styles.link}>
                Iniciar sesion
              </Link>
            )}
          </li>

          <li className={styles.li}>
            <Link to="/registro" className={styles.link}>
              Crear Cuenta
            </Link>
          </li>

          <li className={styles.menucomprimido}>
            <Link className={styles.ligamenu} to="/">
              <img
                className={styles.imagenmenu}
                src={'./img/Menu_icon.png'}
                alt=""
                style={{ width: '50px', height: '50px' }}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
