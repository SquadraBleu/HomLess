import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/inmueble';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';

@Component({
  selector: 'app-lista-inmuebles',
  templateUrl: './lista-inmuebles.component.html',
  styleUrls: ['./lista-inmuebles.component.css']
})
export class ListaInmueblesComponent implements OnInit {

  public inmuebles: Inmueble[] = [/*
    new Inmueble('Esta es una propiedad', '', 200, undefined, 2000000, 0, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', []),
    new Inmueble('Esta es una propiedad', '', 200, undefined, 0, 2000000, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [])
    */
  ];
  id: any = undefined;
  busqueda = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inmuService: InmuebleServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.darInmuebles();
  }

  verInmueble(idInm: string){
    this.router.navigate(['inmobiliaria/ver-inmueble/' + idInm]);
  }

  buscarInmueble(){
    const auxb: Inmueble[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.inmuebles.length; index++) {
      if (this.inmuebles[index].Titulo.toUpperCase().includes(this.busqueda.toUpperCase())
      || this.inmuebles[index].Descripcion.toUpperCase().includes(this.busqueda.toUpperCase())){
        auxb.push(this.inmuebles[index]);
        //  console.log('VEEEERRR', this.inmueble);
      }
    }
    if (auxb.length === 0){
      alert('No hay resultados de busqueda');
      this.busqueda = '';
    }else{
      this.inmuebles = auxb;
    }
  }

  agregarInmueble(){
    this.router.navigate(['inmobiliaria/crear-inmueble']);
  }

  darInmuebles(){
    this.inmuService.getInmuebles().subscribe( res => {
      // this.inmuebles = res;
      // console.log(res);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].IDInmobiliaria === this.id ){
          this.inmuebles.push(res[index]);
          // console.log('VEEEERRR', this.inmuebles);
        }
      }
    });
    console.log('VEEEERRR', this.inmuebles);
  }

  getImageUrl(idInmueble: string) {
    // return 'assets/images/H-Gold.png';
    // const userStorageRef = firebase.storage().ref().child('images/users/' + userId + "_users.jpg");
    // userStorageRef.getDownloadURL().then(url => {
    //   this.userProfileImg = url
    // });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.inmuebles.length; i++) {
      if (this.inmuebles[i].IDI === idInmueble){
        return this.inmuebles[i].DirFotos[0];
      }
    }
  }

  limpiarBusqueda(){
    this.busqueda = '';
    // this.darInmuebles();
    window.location.reload();
    // console.log('Limpiar paises, no se como :(');
  }
}