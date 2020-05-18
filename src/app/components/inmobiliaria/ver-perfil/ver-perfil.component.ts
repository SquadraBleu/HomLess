import { Component, OnInit } from '@angular/core';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {

  inmobiliaria = new Inmobiliaria(
    '',
    '',
    '',
    '',
    '', '', [], '');

  default = 'assets/images/Homless-Sad.png';
  id: any = undefined;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    public inmuSvc: InmuebleServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.darInmobilairia();
  }

  darInmobilairia(){
    this.inmuSvc.getInmobiliarias().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < res.length; i++){
        if (this.id === res[i].UID){
          this.inmobiliaria = res[i];
          console.log(res[i]);
        }
      }
    });
  }

  getImageUrl() {
    return this.inmobiliaria.DireccionLogo;
  }

  editarPerfil(){
    this.router.navigate(['inmobiliaria/editar-perfil/' + this.id]);
  }

  borrarPerfil(){
    this.inmuSvc.deleteInmobiliaria(this.id);
    this.authSvc.deleteUser().then(
      (res) => {
        this.router.navigate(['/public/home']);
      }
    );
  }

  verInmuebles(){
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.id]);
  }

  verRepresentantes(){

  }

  volver(){
    this.router.navigate(['inmobiliaria/lista-inmuebles/' + this.id]);
  }

}
