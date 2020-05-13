import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-representante',
  templateUrl: './ver-representante.component.html',
  styleUrls: ['./ver-representante.component.css']
})
export class VerRepresentanteComponent implements OnInit {

  public representante = new Representante('1032492844', 'juan@jaja', 'jijijisecreto', 'Juan', '123456', '');
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  editarRepresentante(){
    this.router.navigate(['inmobiliaria/editar-representante']);
  }

  eliminarRepresentante(){
    // to do
  }

  volver(){
    this.router.navigate(['inmobiliaria/lista-representantes']);
  }

}
