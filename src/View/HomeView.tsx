import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../img/logo.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const View = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [informacionTrabajadores, setInformacionTrabajadores] = useState<any[]>(
    []
  );
  const searched: any[] = [];

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("data.json");
      setInformacionTrabajadores(response.data);
    };
    getData();
  }, []);

  function handleSumbit(event: any) {
    event.preventDefault();
    setInputSearch(event.target.elements.searchInput.value);
  }

  function addTrabajadores() {
    informacionTrabajadores.map((trabajador) => {
      let nombreApellido =
        trabajador.nombre.toUpperCase() +
        " " +
        trabajador.apellidos.toUpperCase();
      if (nombreApellido.includes(inputSearch.toUpperCase().trim())) {
        searched.push(trabajador);
      }
    });
  }

  addTrabajadores();

  let error: string;
  if (searched.length == 0 && inputSearch !== "") {
    error = "El nombre que ha indicado no existe";
  } else {
    error = "";
  }
  return (
    <div className="container">
      <div className="header">
        <Link to="/">
          <img src={logo} className="logo" alt="logo de Biko" />
        </Link>
        <div className="header-layout">
          <div className="header-layout-text">
            <h1 className="title">
              Busca <b>Bikonianos</b>
            </h1>
            <p className="header-red-text">(lorem ipsum dolor set)</p>
          </div>
        </div>
      </div>

      <div className="">
        <div>
          <div className="grupo-44">
            <p className="body-text-type">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              vitae pretium tellus.
            </p>
          </div>

          <div>
            <form onSubmit={handleSumbit}>
              <input
                type="search"
                id="searchInput"
                placeholder="Nombre Bikoniano"
                className="searchInput"
              />
              <button type="submit" className="btn-sumbit">
                <FontAwesomeIcon className="searchIcon" icon={faSearch} />
              </button>
            </form>
          </div>
          <span className="errores">{error}</span>
        </div>

        <div className="picture-grid">
          <div className="line-grid">
            {searched.map((trabajador) => (
              <div
                id={trabajador.id}
                className="trabajadoresBiko-container card"
              >
                <Link
                  to={{
                    pathname: `/detallesTrabajador/${trabajador.id}`,
                    state: {
                      trabajador: trabajador,
                      informacionTrabajadores: informacionTrabajadores,
                    },
                  }}
                >
                  <img
                    src={trabajador.imgUrl}
                    alt="imagen trabajador"
                    className="trabajador_img"
                  />
                  <div className="description-layer">
                    <div className="transition-layer">
                      <p className="trabajador-text">{trabajador.nombre}</p>
                      <p className="trabajador-text">{trabajador.apellidos}</p>
                      <p className="trabajador-text">{trabajador.rol}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
