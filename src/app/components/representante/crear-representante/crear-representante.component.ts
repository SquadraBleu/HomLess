import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-representante',
  templateUrl: './crear-representante.component.html',
  styleUrls: ['./crear-representante.component.css']
})
export class CrearRepresentanteComponent implements OnInit {

  public representante = new Representante('', '', '' , '', '', '');
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  crearRepresentante(){

  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-representantes']);
  }
}
