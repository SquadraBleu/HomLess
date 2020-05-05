import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  inmobiliaria = new Inmobiliaria(
    '12345678',
    'inmobiliaria@jaja.com',
    '30123323',
    'Tachas Tachas',
    '','',[],'');
    
  contrasena: string;
    
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  guardarPerfil(){
    //TODO INTEGRACION
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/ver-perfil']);
  }

  onUpload(e) {
    //TODO INTEGRACION
  }

}
