import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.png";

export function DetallesTrabajador({ location }: any) {
  const trabajador: any = location.state.trabajador;
  const trabajadores: any[] = location.state.informacionTrabajadores;
  const trabajadoresEquipo: any[] = [];

  function trabajadoresMismoEquipo() {
    trabajadores.map((empleado) => {
      if (
        empleado.equipo === trabajador.equipo &&
        trabajadoresEquipo.length < 3 &&
        empleado.id != trabajador.id
      ) {
        trabajadoresEquipo.push(empleado);
      }
    });

    return (
      <div className="row">
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

  return (
    <div className="container">
      <Link to="/">
        <img src={logo} className="logo-detallesTrabajdor" alt="logo de Biko" />
      </Link>
      <div className="row">
        <div className="col-6">
          <img
            src={trabajador.imgUrl}
            className="fotoTrabajadorBiko"
            alt="imagen de trabajador de Biko"
          />
        </div>
        <div className="col-6">
          <div className="nombre-apellidos-trabajador">
            <h1>{trabajador.nombre}</h1>
            <h1>
              <b>{trabajador.apellidos}</b>
            </h1>
          </div>
          <div>
            <div className="rol">({trabajador.rol})</div>
            <div className="equipo-fecha">
              <FontAwesomeIcon icon={faRocket} /> Fenix{" "}
              <FontAwesomeIcon icon={faCalendar} /> Desde{" "}
              {trabajador.fechaIncorporacion !== undefined
                ? trabajador.fechaIncorporacion.split("/")[2]
                : ""}
            </div>
            <div className="informacionTrabajador">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              vitae pretium tellus. Nulla vitae orci egestas neque elementum
              imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Proin vitae pretium tellus. Nulla vitae orci egestas neque
              elementum imperdiet.
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Miembros de React</p>
      </div>
      <div>{trabajadoresMismoEquipo()}</div>
    </div>
  );
}
