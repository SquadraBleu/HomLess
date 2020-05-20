import {Component, OnInit} from '@angular/core';
import {Cliente} from 'src/app/models/cliente';
import {ActivatedRoute, Router} from '@angular/router';
import {InmuebleServiceService} from '../../../services/inmueble-service.service';
import {ClientService} from '../../../services/client.service';
import {AuthService} from 'src/app/services/auth.service';

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
    private authSvc: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.darCliente();

  }

  volver() {
    // TODO INTEGRACION
  }

  darCliente() {
    this.clienteSvc.getClientes().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        if (this.id === res[i].UID) {
          this.cliente = res[i];
        }
      }
    });
  }

  editarPerfil() {
    console.log('cliente/editar-perfil/' + this.id);
    this.router.navigate(['cliente/editar-perfil/' + this.id]);

  }

  borrarPerfil() {
    // this.clienteSvc.deleteCliente(this.id);
    this.authSvc.deleteUser().then(
      (res) => {
        this.router.navigate(['/public/home']);
      }
    );
  }

  verBusquedas() {
    console.log('to busquedas');
    this.router.navigate(['cliente/ver-busquedas/' + this.id]);

  }

  abrirChat()
  {
    console.log('to chat');
    this.router.navigate(['cliente/chat/' + this.id]);
  }

}
