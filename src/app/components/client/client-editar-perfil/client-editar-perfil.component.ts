import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-client-editar-perfil',
  templateUrl: './client-editar-perfil.component.html',
  styleUrls: ['./client-editar-perfil.component.css']
})
export class ClientEditarPerfilComponent implements OnInit {

  cliente = new Cliente('Iwan TuFuq', '123456789', '3003478654', '420_OG_69@still.com', '', [], [], [], []);

  contrasena: string;
  id: any = undefined;

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  guardarPerfil(){

  }

  cancelar(){
    this.router.navigate(['cliente/ver-perfil']);
  }

}
