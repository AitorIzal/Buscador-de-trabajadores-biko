import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export function DetallesTrabajador({ location }: any) {
  const trabajador: any = location.state.trabajador;
  const trabajadores: any[] = location.state.informacionTrabajadores;
  const trabajadoresEquipo: any[] = [];

  function trabajadoresMismoEquipo() {
    trabajadores.map((empleado) => {
      if (
        empleado.equipo === trabajador.equipo &&
        trabajadoresEquipo.length < 3
      ) {
        trabajadoresEquipo.push(empleado);
      }
    });

    return (
      <div className="row">
        {trabajadoresEquipo.map((empleado) => (
          <Link to={`/detallesTrabajador/${empleado.id}`}>
            <div className="col-3">
              <img
                src={empleado.imgUrl}
                alt=""
                style={{ width: "729.57px", height: "711.28px" }}
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Link to="/">
        <div className="btn btn-black">
          <button>Pagina principal</button>
        </div>
      </Link>
      <div className="row">
        <div className="col-6">
          <img
            src={trabajador.imgUrl}
            style={{ width: "729.57px", height: "711.28px" }}
            alt="imagen de trabajador de Biko"
          />
        </div>
        <div className="col-6">
          <div>
            <h1>{trabajador.nombre}</h1>
            <br />
            <h1>
              <b>{trabajador.apellidos}</b>
            </h1>
          </div>
          <div>
            ({trabajador.rol})
            <FontAwesomeIcon icon={faRocket} /> Fenix
            <FontAwesomeIcon icon={faCalendar} /> Desde{" "}
            {trabajador.fechaIncorporacion}
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
