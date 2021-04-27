import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const DetallesTrabajador = (location: any) => {
  const trabajadores = location.state.informacionTrabajadores;
  const id = useParams();
  console.log(trabajadores);

  return (
    <div>
      <Link to="/">
        <div className="btn btn-black">
          <button>Pagina principal</button>
        </div>
      </Link>
      <div>Holiiiiii</div>
    </div>
  );
};
