import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-editar-perfil',
  templateUrl: './client-editar-perfil.component.html',
  styleUrls: ['./client-editar-perfil.component.css']
})
export class ClientEditarPerfilComponent implements OnInit {

  cliente = new Cliente('Iwan TuFuq', '123456789', '3003478654', '420_OG_69@still.com', '', [], [], [], []);

  contrasena = '';
  id: any = undefined;

  constructor(
    public router: Router,
    private clienteSvc: ClientService,
    private authSvc: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.darCliente();
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

  guardarPerfil(){
    this.clienteSvc.updateCliente(this.cliente, this.cliente.UID);
    if (this.contrasena !== ''){
      this.authSvc.changePassword(this.contrasena).then(
        (res) => {
          this.router.navigate(['cliente/ver-perfil/' + this.id]);
        }
      );
    }else{
      this.router.navigate(['cliente/ver-perfil/' + this.id]);
    }
  }

  cancelar(){
    this.router.navigate(['cliente/ver-perfil/' + this.id]);
  }

}
