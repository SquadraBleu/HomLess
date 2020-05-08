import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {

  inmobiliaria = new Inmobiliaria(
    '12345678',
    'inmobiliaria@jaja.com',
    '30123323',
    'Tachas Tachas',
    '', '', [], '');

  default = 'assets/images/Homless-Sad.png';

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  editarPerfil(){
    this.router.navigate(['inmobiliaria/editar-perfil']);
  }

  borrarPerfil(){

  }

  verInmuebles(){

  }

  volver(){

  }

}
