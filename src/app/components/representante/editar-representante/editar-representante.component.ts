import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from 'src/app/services/representante.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css']
})
export class EditarRepresentanteComponent implements OnInit {
  public representante = new Representante('', '', '', '', '', '');
  public contrasena = '';
  public idRepresentante: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private repreService: RepresentanteService
  ) { }

  ngOnInit(): void {
    this.idRepresentante = this.route.snapshot.paramMap.get('id');
    this.darRepresentante();
  }

  darRepresentante(){
    this.repreService.getRepresentantes().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].UID === this.idRepresentante ){
          this.representante = res[index];
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
  }

  editarRepresentante(){
    this.repreService.updateRepresentante(this.representante, this.representante.UID);
    if (this.contrasena !== ''){
      /*
      this.authSvc.changePassword(this.contrasena).then(
        (res) => {
          this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
        }
      );*/
    }else{
      this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
    }
  }

  cancelar(){
    this.router.navigate(['inmobiliaria/lista-representantes/' + this.representante.IDInmobiliaria]);
  }

}
