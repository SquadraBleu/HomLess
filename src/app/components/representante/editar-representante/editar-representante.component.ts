import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from 'src/app/services/representante.service';
import { AuthService } from 'src/app/services/auth.service';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';

@Component({
  selector: 'app-editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css']
})
export class EditarRepresentanteComponent implements OnInit {
  public representante = new Representante('', '', '', '', '', [], '');
  public contrasena = '';
  public contrasenaRepresentante = '';
  public contrasenaInmobiliaria = '';
  public idRepresentante: string;
  public confirmacionEdit = true;
  public emailInmo = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private inmuService: InmuebleServiceService,
    private repreService: RepresentanteService
  ) { }

  ngOnInit(): void {
    this.idRepresentante = this.route.snapshot.paramMap.get('id');
    this.darRepresentante();
    this.darEmailInmo();
    console.log('meloowso');
  }

  darRepresentante(){
    this.repreService.getRepresentantes().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].UID === this.idRepresentante ){
          this.representante = res[index];
          console.log('idr' + this.representante);
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
  }

  darEmailInmo(){
    console.log('ya entr ');
    this.inmuService.getInmobiliarias().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].UID === this.representante.IDInmobiliaria ){
          console.log('GONORREAAAA' + res[index].Correo);
          this.emailInmo = res[index].Correo;
          console.log('idr2' + this.representante);
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
  }

  editarRepresentante(){
    this.repreService.updateRepresentante(this.representante, this.representante.UID);
    console.log('paseeee');
    this.confirmacionEdit = false;
  }

  confirmarEditar(){
    if (this.contrasenaRepresentante !== ''){
      // this.authSvc.logout();
      // this.authSvc.loginByEmail(this.representante.Correo, this.contrasena);
      // console.log('RRRRR2' + this.contrasenaRepresentante);
      // this.authSvc.changePassword(this.contrasenaRepresentante);
      // this.authSvc.logout();
      // console.log('RRRRR' + this.contrasenaInmobiliaria);
      this.authSvc.loginByEmail(this.emailInmo, this.contrasenaInmobiliaria);
      // console.log('gonorrea ome gnorre');
      this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
    }else{
      this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
    }
    // this.authSvc.logout();
    // console.log('RRRRR' + this.emailInmo);
    // this.authSvc.loginByEmail(this.emailInmo, this.contrasenaInmobiliaria);
    // this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
  }

}
