import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inmueble } from 'src/app/models/inmueble';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { environment } from 'src/environments/environment';
import * as algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchConfig = {
    ...environment.algolia,
    indexName: 'inmuebles_search'
  };


  constructor(private router: Router, private inmuService: InmuebleServiceService) {
    // this.searchGroup = new FormGroup({search: new FormControl() });
  }

  // searchGroup: FormGroup;

  minPriceArriendo = 0; // de 0 a 5000000, de 50000
  maxPriceArriendo = 0; // de 0 a 5000000, de 50000
  minPriceVenta = 0; // de 0 a 1000, de 1 en 1
  maxPriceVenta = 0; // de 0 a 1000, de 1 en 1
  isMinPriceArriendo = false;
  isMaxPriceArriendo = false;
  isMinPriceVenta = false;
  isMaxPriceVenta = false;
  isVenta = false;
  isArriendo = false;

  searchTerm = '';
  minArea = 0; // de 0 a 500, de 1 en 1
  maxArea = 0; // de 0 a 500, de 1 en 1
  isMinArea = false;
  isMaxArea = false;
  nhabitaciones = 0;
  nbanos = 0;
  zona = '';
  localidad = '';
  tipoInmueble = '';

  madeSearch = false;
  auxb: Inmueble[] = [];

  inmuebles: Inmueble[] = [/*
    new Inmueble('Esta es una propiedad', '', 200, undefined, 2000000, 0, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [], ''),
    new Inmueble('Esta es una propiedad', '', 200, undefined, 500000, 2000000, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [], '')*/
  ];

  tiposDeInmueble: string[] = [
    '',
    'Edificio',
    'Casa',
    'Apartamento',
    'Apartaestudio'
  ];

  localidades: string[] = [
    '',
    'Usaquen',
    'Chapinero',
    'Santa Fe',
    'San Cristobal',
    'Usme',
    'Tunjuelito',
    'Bosa',
    'Kennedy',
    'Fontibón',
    'Engativá',
    'Suba',
    'Barrios Unidos',
    'Teusaquillo',
    'Los Mártires',
    'Antonio Nariño',
    'Puente Aranda',
    'La Candelaria',
    'Rafael Uribe Uribe',
    'Ciudad Bolívar',
    'Sumapaz'
  ];

  zonas: string[] = [
    '',
    'Norte',
    'Noroccidente',
    'Centro',
    'Occidente',
    'Sur',
    'Suroccidente',
    'Suroriente'
  ];

  ngOnInit(): void
  {
    this.darInmuebles();
  }

  darInmuebles(){
    this.inmuService.getInmuebles().subscribe( res => {
      this.inmuebles = res;
      // console.log(res);
      console.log('VEEEERRR', this.inmuebles);
      /*
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < res.length; index++) {
        if (res[index].MontoArriendo === undefined ){
          res[index].MontoArriendo = 0;
          // this.inmuebles.push(res[index]);
          // console.log('VEEEERRR', this.inmuebles);
        }
        if (res[index].MontoVenta === undefined ){
          res[index].MontoVenta = 0;
          // this.inmuebles.push(res[index]);
          // console.log('VEEEERRR', this.inmuebles);
        }
        this.inmuebles.push(res[index]);
      }
      */
    });
  }

  submitSearch(): void
  {
    if (this.searchTerm !== ''){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].Titulo.toUpperCase().includes(this.searchTerm.toUpperCase())
        || this.inmuebles[index].Descripcion.toUpperCase().includes(this.searchTerm.toUpperCase())){
          this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
      console.log('primer filtro', this.inmuebles);
    }

    if (this.tipoInmueble !== ''){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].TipoInmueble === this.tipoInmueble){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.nhabitaciones !== 0){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        // console.log('fsdfsdfsdfsdfds' , this.inmuebles[index].NHabitaciones);
        // console.log('fsdfsdfsdfsdfds2' , this.nhabitaciones);
        // tslint:disable-next-line: triple-equals
        if (this.inmuebles[index].NHabitaciones == this.nhabitaciones){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.nbanos !== 0){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        // tslint:disable-next-line: triple-equals
        if (this.inmuebles[index].NBanos == this.nbanos){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.zona !== ''){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].Zona === this.zona){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.localidad !== ''){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].Localidad === this.localidad){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.isMinArea === true){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].AreaConstruida >= this.minArea && this.existe(this.inmuebles[index].IDI) === false ){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.isMaxArea === true){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].AreaConstruida <= this.maxArea && this.existe(this.inmuebles[index].IDI) === false){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.isArriendo === true){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].MontoArriendo !== undefined && this.isMinPriceArriendo === true){
          if ( this.inmuebles[index].MontoArriendo !== undefined
            && this.inmuebles[index].MontoArriendo >= this.minPriceArriendo
            && this.existe(this.inmuebles[index].IDI) === false){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
          }
        }
        if (this.inmuebles[index].MontoArriendo !== undefined && this.isMaxPriceArriendo === true){
          if ( this.inmuebles[index].MontoArriendo !== undefined
            && this.inmuebles[index].MontoArriendo <= this.maxPriceArriendo
            && this.existe(this.inmuebles[index].IDI) === false){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
          }
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.isVenta === true){
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.inmuebles.length; index++) {
        if (this.inmuebles[index].MontoVenta !== undefined && this.isMinPriceVenta === true){
          if ( this.inmuebles[index].MontoVenta !== undefined
            && this.inmuebles[index].MontoVenta >= (this.minPriceVenta * 1000000)
            && this.existe(this.inmuebles[index].IDI) === false ){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
          }
        }
        if (this.inmuebles[index].MontoVenta !== undefined && this.isMaxPriceVenta === true){
          if ( this.inmuebles[index].MontoVenta !== undefined
            && this.inmuebles[index].MontoVenta <= (this.maxPriceVenta * 1000000)
            && this.existe(this.inmuebles[index].IDI) === false ){
            this.auxb.push(this.inmuebles[index]);
          // console.log('VEEEERRR', index);
          // auxb.splice(index, 1);
          }
        }
      }
      this.inmuebles = this.auxb;
      this.auxb = [];
    }

    if (this.inmuebles.length === 0){
      alert('No hay resultados de busqueda');
      this.searchTerm = '';
      this.inmuebles = [];
    }else{
      // this.inmuebles = this.auxb;
      console.log(this.inmuebles);
      this.madeSearch = true;
      console.log('Make search');
    }
  }

  existe(idn: string): boolean{
    let a = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.auxb.length; i++){
      if (this.auxb[i].IDI === idn){
        a = true;
        break;
      }
    }
    return a;
  }

  getMinVentaSliderValue(event: any)
  {
    this.minPriceVenta = event.target.value;
  }

  getMaxVentaSliderValue(event: any)
  {
    this.maxPriceVenta = event.target.value;
  }

  getMinArriendoSliderValue(event: any)
  {
    this.minPriceArriendo = event.target.value;
  }

  getMaxArriendoSliderValue(event: any)
  {
    this.maxPriceArriendo = event.target.value;
  }

  getMinAreaSliderValue(event: any)
  {
    this.minArea = event.target.value;
  }

  getMaxAreaSliderValue(event: any)
  {
    this.maxArea = event.target.value;
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
        if (this.inmuebles[i].DirFotos !== undefined && this.inmuebles[i].DirFotos.length > 0){
          return this.inmuebles[i].DirFotos[0];
        }
      }
    }
  }

  verInmueble(idInm: string){
    console.log('Entre a la Funcion');
    const id = 10;
    this.router.navigate(['public/search/ver-inmueble/' + idInm]);

  }

  clean()
  {
    this.madeSearch = false;
    this.darInmuebles();
    window.location.reload();
  }

}
