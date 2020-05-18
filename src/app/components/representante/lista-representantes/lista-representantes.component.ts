import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-representantes',
  templateUrl: './lista-representantes.component.html',
  styleUrls: ['./lista-representantes.component.css']
})
export class ListaRepresentantesComponent implements OnInit {

  public representantes: Representante[] = [
    new Representante('1032492844', 'JUAN@Inmobiliaria.com', 'jiijiji', 'Juan', '123456789', 'IDNORARO'),
    new Representante('1032492844', 'JUAN@Inmobiliaria.com', 'jiijiji', 'Juan', '123456789', 'IDNORARO'),
    new Representante('1032492844', 'JUAN@Inmobiliaria.com', 'jiijiji', 'Juan', '123456789', 'IDNORARO')
  ];
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  verRepresentante(ID: string){
    this.router.navigate(['inmobiliaria/ver-representante']);
  }

  editarRepresentante(ID: string){
    this.router.navigate(['inmobiliaria/editar-representante']);
  }

  eliminarRepresentante(ID: string){

  }

}
