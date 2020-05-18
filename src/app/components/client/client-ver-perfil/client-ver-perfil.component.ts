import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import {ActivatedRoute, Router} from '@angular/router';
import {InmuebleServiceService} from "../../../services/inmueble-service.service";

@Component({
  selector: 'app-client-ver-perfil',
  templateUrl: './client-ver-perfil.component.html',
  styleUrls: ['./client-ver-perfil.component.css']
})
export class ClientVerPerfilComponent implements OnInit {

  id: any = undefined;
  cliente = new Cliente('Iwan TuFuq', '123456789', '3003478654', '420_OG_69@still.com', '', [], [], [], []);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log( 'TOOOOOOOOOOOO:: ' );
    this.id = this.route.snapshot.paramMap.get('id');
    console.log( 'pass to client:: ' , this.id);
  }

  volver(){
    // TODO INTEGRACION
  }

  editarPerfil(){
    console.log('to PER');
    this.router.navigate(['cliente/editar-perfil']);
  }

  borrarPerfil(){
    // TODO INTEGRACION
  }

  verBusquedas(){
    console.log('to busquedas');
    this.router.navigate(['cliente/ver-busquedas']);

  }

}
