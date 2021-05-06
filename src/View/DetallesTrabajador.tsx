import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.png";
import "bootstrap/dist/css/bootstrap.css";

export function DetallesTrabajador({ location }: any) {
  const trabajador: any = location.state.trabajador;
  const trabajadores: any[] = location.state.informacionTrabajadores;
  const trabajadoresEquipo: any[] = [];
  const trabajadoresTecnologias: any[] = [];

  function trabajadoresMismoEquipo() {
    trabajadores.map((empleado) => {
      if (
        empleado.equipo === trabajador.equipo &&
        trabajadoresEquipo.length < 4 &&
        empleado.id != trabajador.id
      ) {
        trabajadoresEquipo.push(empleado);
      }
    });

    return (
      <div className="d-flex">
        {trabajadoresEquipo.map((empleado) => (
          <Link
            to={{
              pathname: `/detallesTrabajador/${empleado.id}`,
              state: {
                trabajador: empleado,
                informacionTrabajadores: trabajadores,
              },
            }}
          >
            <div className="col-3">
              <img src={empleado.imgUrl} alt="" className="trabajador_img" />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  function getDate() {
    if (trabajador.fechaIncorporacion !== undefined) {
      return (
        <div className="container-calendario">
          <p className="calendario-texto">
            <FontAwesomeIcon icon={faCalendar} className="calendario" />
            <b>{"Desde " + trabajador.fechaIncorporacion.split("/")[2]}</b>
          </p>
        </div>
      );
    } else {
      return "";
    }
  }

  function trabajadoresMismaTecnologia() {
    trabajadores.map((empleado) => {
      if (
        empleado.tecnologias.includes(trabajador.tecnologias.split(" ")[0]) &&
        trabajadoresTecnologias.length < 4 &&
        empleado.id != trabajador.id
      ) {
        trabajadoresTecnologias.push(empleado);
      }
    });

    return (
      <div className="d-flex">
        {trabajadoresTecnologias.map((empleado) => (
          <Link
            to={{
              pathname: `/detallesTrabajador/${empleado.id}`,
              state: {
                trabajador: empleado,
                informacionTrabajadores: trabajadores,
              },
            }}
          >
            <div className="miembro-tecnologia">
              <img src={empleado.imgUrl} alt="" className="trabajador_img" />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  function tecnologias() {
    const teconlogiasTrabajador: [] = trabajador.tecnologias.split(" ");

    return (
      <ul className="lista-tecnologias">
        {teconlogiasTrabajador.map((tecnologia) => (
          <li className="tecnologia">{tecnologia}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="main-container">
      <div className="trabajador">
        <img
          src={trabajador.imgUrl}
          className="fotoTrabajadorBiko"
          alt="imagen de trabajador de Biko"
        />

        <div className="informacionTrajador">
          <h1 className="nombre-apellidos-trabajador">{trabajador.nombre}</h1>
          <h1 className="nombre-apellidos-trabajador">
            <b>{trabajador.apellidos}</b>
          </h1>

          <div className="rol">({trabajador.rol})</div>
          <div className="icons-container">
            <div className="container-equipo">
              <FontAwesomeIcon icon={faRocket} className="cohete" />
              <p className="equipo-texto">{trabajador.equipo}</p>
            </div>
            {getDate()}
          </div>

          <div className="container-texto">
            {tecnologias()}

            <div className="descripcionTrabajador">
              <p className="sobreTrabajador">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                vitae pretium tellus. Nulla vitae orci egestas neque elementum
                imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Proin vitae pretium tellus. Nulla vitae orci egestas neque
                elementum imperdiet.
              </p>
            </div>
          </div>
        </div>

        <Link to="/">
          <img
            src={logo}
            className="logo-detallesTrabajdor"
            alt="logo de Biko"
          />
        </Link>

        <div className="container-otros-trabajadores">
          <div className="tecnologia-titulo">
            <p className="tituloTecnologia">
              Miembros de {trabajador.tecnologias.split(" ")[0]}
            </p>
          </div>
          <div className="miembros-tecnologia">
            {trabajadoresMismaTecnologia()}
          </div>
          <div className="arrow-container">
            <p>
              <i className="arrow-shape"></i>
            </p>
            <p>
              <i className="arrow down"></i>
            </p>
          </div>

          <div className="trabajadoresEquipo">
            <p className="equipo-titulo">Otra gente de {trabajador.equipo}</p>
          </div>
          <div className="mismoEquipo">{trabajadoresMismoEquipo()}</div>
        </div>
      </div>
    </div>
  );
}
