import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from 'src/app/services/representante.service';
import { AuthService } from 'src/app/services/auth.service';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';

@Component({
  selector: 'app-lista-representantes',
  templateUrl: './lista-representantes.component.html',
  styleUrls: ['./lista-representantes.component.css']
})
export class ListaRepresentantesComponent implements OnInit {

  public representantes: Representante[] = [];
  public idInmobiliria: string;
  public confirmacionDelete = true;
  public contrasenaInmobiliaria = '';
  public contrasenaRepresentante = '';
  public emailRepre = '';
  public emailInmo = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private inmuService: InmuebleServiceService,
    private repreService: RepresentanteService
  ) { }

  ngOnInit(): void {
    this.idInmobiliria = this.route.snapshot.paramMap.get('id');
    this.darRepresentantes();
    this.darEmailInmo();
  }

  darRepresentantes(){
    this.repreService.getRepresentantes().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].IDInmobiliaria === this.idInmobiliria ){
          this.representantes.push(res[index]);
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
  }

  darEmailInmo(){
    this.inmuService.getInmobiliarias().subscribe( res => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].IDInmobiliaria === this.idInmobiliria ){
          this.emailInmo = res[index].Correo;
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
  }

  crearRepresentante(){
    this.router.navigate(['inmobiliaria/crear-representante/' + this.idInmobiliria]);
  }

  verRepresentante(ID: string){
    this.router.navigate(['inmobiliaria/ver-representante/' + ID]);
  }

  editarRepresentante(ID: string){
    this.router.navigate(['inmobiliaria/editar-representante/' + ID]);
  }

  eliminarRepresentante(ID: string, email: string){
    this.confirmacionDelete = false;
    this.emailRepre = email;
    // this.repreService.deleteRepresentante(ID);
    /*
    this.authSvc.deleteUser().then(
      (res) => {
        this.router.navigate(['/public/home']);
      }
    );*/
  }

  confirmarEliminar(){
    // this.authSvc.loginByEmail(this.emailRepre, this.contrasenaRepresentante);
    // this.authSvc.deleteUser();
    // this.authSvc.loginByEmail(this.emailInmo, this.contrasenaInmobiliaria);
    this.router.navigate(['inmobiliaria/lista-representantes/' + this.idInmobiliria]);
    window.location.reload();
  }

}
