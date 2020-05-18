import { Component, OnInit } from '@angular/core';
import { Representante } from 'src/app/models/representante';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from 'src/app/services/representante.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-representantes',
  templateUrl: './lista-representantes.component.html',
  styleUrls: ['./lista-representantes.component.css']
})
export class ListaRepresentantesComponent implements OnInit {

  public representantes: Representante[] = [];
  public idInmobiliria: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private repreService: RepresentanteService
  ) { }

  ngOnInit(): void {
    this.idInmobiliria = this.route.snapshot.paramMap.get('id');
    this.darRepresentantes();
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

  crearRepresentante(){
    this.router.navigate(['inmobiliaria/crear-representante/' + this.idInmobiliria]);
  }

  verRepresentante(ID: string){
    this.router.navigate(['inmobiliaria/ver-representante/' + ID]);
  }

  editarRepresentante(ID: string){
    this.router.navigate(['inmobiliaria/editar-representante/' + ID]);
  }

  eliminarRepresentante(ID: string){
    this.repreService.deleteRepresentante(ID);
    /*
    this.authSvc.deleteUser().then(
      (res) => {
        this.router.navigate(['/public/home']);
      }
    );*/
  }

}
