export class Trabajador {
  id: string;
  nombre: string;
  apellidos: string;
  equipo: string;
  rol: string;
  fechaIncorporacion: string;
  imgUrl: string;

  constructor(
    id: string,
    nombre: string,
    apellidos: string,
    equipo: string,
    rol: string,
    fechaIncorporacion: string,
    imgUrl: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.equipo = equipo;
    this.rol = rol;
    this.fechaIncorporacion = fechaIncorporacion;
    this.imgUrl = imgUrl;
  }
}
