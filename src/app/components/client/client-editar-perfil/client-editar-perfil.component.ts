import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-client-editar-perfil',
  templateUrl: './client-editar-perfil.component.html',
  styleUrls: ['./client-editar-perfil.component.css']
})
export class ClientEditarPerfilComponent implements OnInit {

  cliente = new Cliente('Iwan TuFuq','123456789','3003478654','420_OG_69@still.com','');

  contrasena: string;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  guardarPerfil(){

  }

  cancelar(){
    this.router.navigate(['cliente/ver-perfil']);
  }

}
