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
  console.log(informacionTrabajadores);

  function handleSumbit(event: any) {
    event.preventDefault();
    console.log(event.target.elements.searchInput.value);
    setInputSearch(event.target.elements.searchInput.value);
  }

  function homeView() {
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
          </div>

          <div className="picture-grid">
            <div className="line-grid">
              {informacionTrabajadores.map((trabajador) => (
                <div id={trabajador.id} className="trabajadoresBiko-container">
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function homeViewResultados() {
    informacionTrabajadores.map((trabajador) => {
      let nombreApellido =
        trabajador.nombre.toUpperCase() +
        " " +
        trabajador.apellidos.toUpperCase();
      if (nombreApellido.includes(inputSearch.toUpperCase())) {
        console.log("se ha añadido trabajador");
        searched.push(trabajador);
      }
    });
    console.log(searched);

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
          </div>

          <div className="picture-grid">
            <div className="line-grid">
              {searched.map((trabajador) => (
                <div id={trabajador.id} className="trabajadoresBiko-container">
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
