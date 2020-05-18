import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css']
})
export class EditarRepresentanteComponent implements OnInit {
  public representante = new Representante('1032492844', 'juan@jaja', 'jijijisecreto', 'Juan', '123456', '');
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  editarRepresentante(){
    // TO-DO
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-representantes']);
  }

}
