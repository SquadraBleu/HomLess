import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public rolRegistro = '';
  inmobiliaria = new Inmobiliaria('', '', '', '', '', '', [], '');
  cliente = new Cliente('', '', '', '', '');
  public contrasena: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.rolRegistro);
  }

  registrarInmobiliaria(){
    // TODO INTEGRACION
  }

  registrarCliente(){
    // TODO INTEGRACION
  }
  onUpload(e) {
    // TODO INTEGRACION
  }
  cancelar(){
    this.router.navigate(['public/home']);
  }

}
