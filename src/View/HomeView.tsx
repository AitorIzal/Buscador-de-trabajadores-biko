import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trabajador } from "../Clase/Trabajador";
import "bootstrap/dist/css/bootstrap.css";

export const View = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [informacionTrabajadores, setInformacionTrabajadores] = useState<any[]>(
    []
  );
  const searched: Trabajador[] = [];

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("data.json");
      setInformacionTrabajadores(response.data);
    };
    getData();
  }, []);
  console.log(informacionTrabajadores);

  function handleSumbit(event: any) {
    event.preventDefault();
    console.log(event.target.elements.searchInput.value);
    setInputSearch(event.target.elements.searchInput.value);
  }

  function homeView() {
    return (
      <div className="container-fluid">
        <div className="header">
          <h1 className="title">Busca Bikonianos</h1>
          <p className="header-red-text">(lorem ipsum dolor set)</p>
          <p className="header-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
            pretium tellus.
          </p>
        </div>
        <div>
          <form onSubmit={handleSumbit}>
            <input type="search" id="searchInput" className="searchInput" />
            <button type="submit">buscar</button>
          </form>
        </div>
        <div className="row">
          {informacionTrabajadores.map((trabajador) => (
            <div id={trabajador.id} className="col-3">
              <Link
                to={{
                  pathname: `/detallesTrabajador/${trabajador.id}`,
                  state: {
                    trabajador: trabajador,
                    informacionTrabajadores: informacionTrabajadores,
                  },
                }}
              >
                <div className="trabajadorBiko">
                  <img
                    src={trabajador.imgUrl}
                    alt="flower image"
                    className="flower_img"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function homeViewResultados() {
    let empleado: Trabajador;
    informacionTrabajadores.map((trabajador) => {
      let nombreApellido =
        trabajador.nombre.toUpperCase() +
        " " +
        trabajador.apellidos.toUpperCase();
      if (nombreApellido.includes(inputSearch.toUpperCase())) {
        console.log("holiii");
        empleado = new Trabajador(
          trabajador.id,
          trabajador.nombre,
          trabajador.apellidos,
          trabajador.equipo,
          trabajador.rol,
          trabajador.fechaIncorporacion,
          trabajador.imgUrl
        );
        searched.push(empleado);
      }
    });
    console.log(searched);

    return (
      <div className="container-fluid">
        <div className="header">
          <h1 className="title">Busca Bikonianos</h1>
          <p className="header-red-text">(lorem ipsum dolor set)</p>
          <p className="header-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
            pretium tellus.
          </p>
        </div>
        <div>
          <form onSubmit={handleSumbit}>
            <input type="search" id="searchInput" className="searchInput" />
            <button type="submit">buscar</button>
          </form>
        </div>
        <div className="row">
          {searched.map((trabajador) => (
            <div id={trabajador.id} className="col-3">
              <Link
                to={{
                  pathname: `/detallesTrabajador/${trabajador.id}`,
                  state: {
                    trabajador: trabajador,
                    informacionTrabajadores: informacionTrabajadores,
                  },
                }}
              >
                <div className="trabajadorBiko">
                  <img
                    src={trabajador.imgUrl}
                    alt="flower image"
                    className="flower_img"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!inputSearch) {
    return homeView();
  } else {
    return homeViewResultados();
  }
};
