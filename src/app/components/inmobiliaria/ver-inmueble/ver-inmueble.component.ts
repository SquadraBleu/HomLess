import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';

@Component({
  selector: 'app-ver-inmueble',
  templateUrl: './ver-inmueble.component.html',
  styleUrls: ['./ver-inmueble.component.css']
})
export class VerInmuebleComponent implements OnInit {

  constructor() {

  }

  Descripcion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  Titulo = 'Hermosa casa en Venta en Miraflores';
  AreaConstruida = 75;
  AreaDeposito = 5;
  NBanos = 2;
  NHabitaciones = 3;
  Estrato = 3;
  Zona = 'Norte';
  Localidad = 'Usaquen';
  Barrio = 'Pepito Perez II';
  Precio = 135000000;

  ngOnInit(): void {
  }

}
