import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trabajador } from "./Clase/Trabajador";

export const View = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [id, setId] = useState("");
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

  function handleClick(event: any) {
    setId(event.currentTarget.id);
    console.log(id);
  }

  function homeView() {
    return (
      <div>
        <div>
          <form onSubmit={handleSumbit}>
            <input type="search" id="searchInput" className="searchInput" />
            <button type="submit">buscar</button>
          </form>
        </div>
        {informacionTrabajadores.map((trabajador) => (
          <Link
            to={{
              pathname: `/detallesTrabajador/${trabajador.id}`,
              state: { informacionTrabajadores },
            }}
          >
            <div
              id={trabajador.id}
              onClick={handleClick}
              className="col-3 flower"
            >
              <p>{trabajador.nombre}</p>
              <img
                src={trabajador.imgUrl}
                style={{ width: "200px", height: "200x" }}
                alt="flower image"
                className="flower_img"
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  function detallesTrabajaforView() {
    informacionTrabajadores.map((trabajador) => {
      if (trabajador.id === id) {
        <div>
          <img src={trabajador.imgUrl} alt="Imagen de trabajador de Biko" />
        </div>;
      }
    });
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
      <div>
        <div>
          <form onSubmit={handleSumbit}>
            <input type="search" id="searchInput" className="searchInput" />
            <button type="submit">buscar</button>
          </form>
        </div>
        {searched.map((trabajador) => (
          <Link to={`/detallesTrabajador/${trabajador.id}`}>
            <div
              id={trabajador.id}
              onClick={handleClick}
              className="col-3 flower"
            >
              <p>{trabajador.nombre}</p>
              <img
                src={trabajador.imgUrl}
                style={{ width: "200px", height: "200x" }}
                alt="flower image"
                className="flower_img"
              />
            </div>
          </Link>
        ))}
      </div>
    );
  }

  if (!inputSearch) {
    return homeView();
  } else {
    return homeViewResultados();
  }
};
