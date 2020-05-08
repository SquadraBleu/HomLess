import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-ver-perfil',
  templateUrl: './client-ver-perfil.component.html',
  styleUrls: ['./client-ver-perfil.component.css']
})
export class ClientVerPerfilComponent implements OnInit {

  cliente = new Cliente('Iwan TuFuq', '123456789', '3003478654', '420_OG_69@still.com', '', [], [], [], []);
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  volver(){
    // TODO INTEGRACION
  }

  editarPerfil(){
    this.router.navigate(['cliente/editar-perfil']);
  }

  borrarPerfil(){
    // TODO INTEGRACION
  }

  verBusquedas(){

  }

}
