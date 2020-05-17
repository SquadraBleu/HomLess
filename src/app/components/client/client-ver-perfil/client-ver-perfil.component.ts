import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-ver-perfil',
  templateUrl: './client-ver-perfil.component.html',
  styleUrls: ['./client-ver-perfil.component.css']
})
export class ClientVerPerfilComponent implements OnInit {

  cliente = new Cliente('', '', '', '', '', [], [], [], []);
  id: any = undefined;

  constructor(
    private route: ActivatedRoute,
    private clienteSvc: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.darCliente();
  }

  volver(){
    // TODO INTEGRACION
  }

  darCliente(){
    this.clienteSvc.getClientes().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < res.length; i++){
        if (this.id === res[i].UID){
          this.cliente = res[i];
        }
      }
    });
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
