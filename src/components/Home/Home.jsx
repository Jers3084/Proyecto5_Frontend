import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import facebook from "./img/facebook_social_media_icon_gris.png";
import instagram from "./img/circlesocialinstagram_gris.png";

export const Home = () => {
  const [correo, setCorreo] = useState("");

  return (
    <>
      <section className={styles.seccion1}>
        <article className={styles.txtSeccion1}>
          <h1 className={styles.titulo}>Tu salud en manos expertas</h1>
          <span className={styles.relleno} />

          <p className={styles.txtCuerpo}>
            Somos una clinica dedicada a la Fisioterapia con Técnicas de Masaje
            Terapeutico Tradicional Shiatsu Namikoshi. Acupuntura y Medicina
            China, en donde se proporcionan diversos tratamientos con terapias
            alternativas, para diferentes patologias.
          </p>
          <p className={styles.txtCuerpo}>
            Patologías Neurologicas como Paralisis Facial, Apoplejías, Tics,
            Patologías Musculoesqueleticas, Artritis, Hombro Rigido, Sindrome
            del codo, Tunel Carpiano, Ciatica, Lumbalgia, Circulatorias, Edemas,
            Linfidema, Lipodema, PostOperatorios, posFracturas, etc
          </p>
          <p>
            Para recuperar tu salud, acércate a nosotros y conoce nuestros
            servicios
          </p>
          <form action="formcorreo">
            <input
              className={styles.entradaCorreo}
              type="email"
              name="correo"
              id="correodecontacto"
              placeholder="  Ingresa tu correo"
              value={correo}
              required
              onChange={(e) => {
                setCorreo(e.target.value);
              }}
            />
            <button className={styles.boton}>Enviar</button>
          </form>
          <p className={styles.txtPie}>
            Te contactaremos en 24 horas. Aceptamos todas las tarjetas de crédito y débito.
          </p>
        </article>
        <article className={styles.imagenPrincipal} />
      </section>

      <section className={styles.seccion2}>
        <Link name="saltoseccion1" to="#"></Link>
        <header className={styles.tituloservicios}>
          <h1>Nuestros Servicios</h1>
          <br />
          <p className={styles.subTituloServicios}>
            Estos son los servicios para que recuperes tu salud por medio de la
            medicina complementaria
          </p>
        </header>

        <section className={styles.tarjetas}>
          <div className={styles.tarjeta}>
            <div className={styles.imgAcupuntura}></div>
            <div className={styles.desc}>
              <h2>Acupuntura</h2>
              <p className={styles.descripciones}>
                Disminuye el dolor cronico,libera el estrés y la ansiedad,
                mejora el insomnio y disminuye reacciones alérgicas.
              </p>
            </div>
          </div>
          <div className={styles.tarjeta}>
            <div className={styles.imgQuiropraxiaOsteopatia}></div>
            <div className={styles.desc}>
              <h2>Quiropraxia y Osteopatia</h2>
              <p className={styles.descripciones}>
                Corrige la postura y elimina el dolor de espalda, cintura y
                dolores de los huesos y musculos.
              </p>
            </div>
          </div>
          <div className={styles.tarjeta}>
            <div className={styles.imgRehabilitacion}></div>
            <div className={styles.desc}>
              <h2>Rehabilitación Física</h2>
              <p className={styles.descripciones}>
                Sana y recupera las capacidades motrices del individuo que ha
                sido afectado por una lesión o enfermedad.
              </p>
            </div>
          </div>
          <div className={styles.tarjeta}>
            <div className={styles.imgLinfatico}></div>
            <div className={styles.desc}>
              <h2>Drenaje Linfatico</h2>
              <p className={styles.descripciones}>
                El drenaje linfatico ayuda a desinflamar el cuerpo y
                extremidades,liberar toxinas y restablece el equilibrio y la
                salud.
              </p>
            </div>
          </div>
        </section>
      </section>

      <footer className={styles.piedepagina}>
        <div className={styles.redesSociales}>
          <a
            className={styles.icono1}
            href="https://www.facebook.com/vidanatura.rehabilitacionfisica"
            target="_blank"
            rel="noopener noreferrer">
            <img src={facebook} alt="" width="20px" height="20px" /> Facebook
          </a>
          <a
            className={styles.icono2}
            href="https://instagram.com/vida_natura_3084"
            target="_blank"
            rel="noopener noreferrer">
            <img src={instagram} alt="" width="20px" height="20px" /> Instagram
          </a>
        </div>
        <hr />
        <div className={styles.txtpie}>
          <p className={styles.copyright}>
            Dirección: Calle Campo Tecominoacan 126, Fracc. Carrizal,
            Villahermosa,Tabasco. Telefono: 993 316 7259. Horario: 10 am a 5 pm.
          </p>
          <p className={styles.copyright}>
            © 2021 Vid Natura. Todos los derechos reservados. Esta es una página
            de aterrizaje ficticia para fines académicos.
          </p>
        </div>
      </footer>
    </>
  );
};
