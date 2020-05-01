import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-busquedas',
  templateUrl: './ver-busquedas.component.html',
  styleUrls: ['./ver-busquedas.component.css']
})
export class VerBusquedasComponent implements OnInit {

  constructor() { }

  public busquedas: number[] = [2, 3, 4]; // Esto es un placeholder porque no existe la clase Busqueda
                                          // Y pues mientras se deciden...

  ngOnInit(): void {
  }

  activarBusqueda(i: number): void
  {
    console.log('Activar alerta de busqueda en la posicion ' + i + ' de busquedas');
  }

  eliminarBusqueda(i: number): void
  {
    console.log('Eliminar busqueda en la posicion ' + i + ' de busquedas');
  }

}
