import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inmueble } from 'src/app/models/inmueble';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) {
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

  searchTerm: string;
  minArea = 0; // de 0 a 500, de 1 en 1
  maxArea = 0; // de 0 a 500, de 1 en 1
  isMinArea = false;
  isMaxArea = false;
  nhabitaciones: number;
  nbanos: number;
  zona: string;
  localidad: string;
  tipoInmueble: string;

  madeSearch = false;

  inmuebles: Inmueble[] = [
    new Inmueble('Esta es una propiedad', '', 200, undefined, 2000000, 0, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [], ''),
    new Inmueble('Esta es una propiedad', '', 200, undefined, 500000, 2000000, undefined
    , 'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [], '')
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

  }

  submitSearch(): void
  {
    this.madeSearch = true;
    console.log('Make search');
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

  getImageUrl(/*userId: string*/) {
    return 'assets/images/H-Gold.png';
    // const userStorageRef = firebase.storage().ref().child('images/users/' + userId + "_users.jpg");
    // userStorageRef.getDownloadURL().then(url => {
    //   this.userProfileImg = url
    // });
  }

  verInmueble(){
    console.log('Entre a la Funcion');
    const id = 10;
    this.router.navigate(['public/search/ver-inmueble/' + id]);

  }

  clean()
  {
    this.madeSearch = false;
    window.location.reload();
  }

}
