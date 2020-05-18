import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-crear-representante',
  templateUrl: './crear-representante.component.html',
  styleUrls: ['./crear-representante.component.css']
})
export class CrearRepresentanteComponent implements OnInit {

  public representante = new Representante('', '', '' , '', '', '');
  public contrasena: string;
  public idInmobiliria: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private repreService: RepresentanteService
  ) { }

  ngOnInit(): void {
    this.idInmobiliria = this.route.snapshot.paramMap.get('id');
  }

  crearRepresentante(){
    this.representante.IDInmobiliaria = this.idInmobiliria;
    this.authSvc.registerUser(this.representante.Correo, this.contrasena, false, false, this.representante)
    .then((res) => {
      // tslint ignore:line
      console.log('resUser', res.user.uid);
      // tslint ignore:line
      this.representante.UID = res.user.uid;
      this.repreService.createRepresentante(this.representante);
      this.router.navigate(['inmobiliaria/lista-representantes/' + this.idInmobiliria]);
    }).catch(err => console.log('err', err.message));
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-representantes/'  + this.idInmobiliria]);
  }
}
