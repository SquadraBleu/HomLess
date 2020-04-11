import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() {
    // this.searchGroup = new FormGroup({search: new FormControl() });
  }

  // searchGroup: FormGroup;

  minPriceArriendo = 0;
  maxPriceArriendo = 0;
  minPriceVenta = 0;
  maxPriceVenta = 0;
  isMinPriceArriendo = false;
  isMaxPriceArriendo = false;
  isMinPriceVenta = false;
  isMaxPriceVenta = false;
  isVenta = false;
  isArriendo = false;

  searchTerm: string;
  minArea = 0;
  maxArea = 0;
  isMinArea = false;
  isMaxArea = false;
  nhabitaciones: number;
  nbanos: number;

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

}
