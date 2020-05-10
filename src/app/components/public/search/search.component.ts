import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Inmueble} from 'src/app/models/inmueble';
import {InmuebleServiceService} from 'src/app/services/inmueble-service.service';
import {environment} from 'src/environments/environment';
import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
const indexAlg = client.initIndex('inmuebles_search');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
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
  tags = '';
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
  isLogged = false;
  activarAlerta = false;
  auxb: Inmueble[] = [];
  filters = '';
  multipleFilters = false;
  rangeArea = false;

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

  ngOnInit(): void {
    this.darInmuebles();
  }

  darInmuebles() {
    this.inmuService.getInmuebles().subscribe(res => {
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

  submitSearch(): void {
    console.log('Init Submit to Algolia');
    this.filters = '';
    console.log(this.tags); // String separado por comas, es necesario hacer trim al string completo
                            // y luego a cada string parseado, por si el usuario puso espacios antes o
                            // después de la palabra. Ojo que podrían haber espacios entre el tag y eso sí es válido

    if (this.tipoInmueble !== '') {
      this.multipleFilters = true;
      this.filters += 'TipoInmueble:' + this.tipoInmueble;
      console.log(this.filters);
    }

    if (this.nhabitaciones !== 0) {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      this.filters += 'NHabitaciones = ' + this.nhabitaciones;
      console.log(this.filters);
    }

    if (this.nbanos !== 0) {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      this.filters += 'NBanos = ' + this.nbanos;
    }

    if (this.zona !== '') {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      this.filters += 'Zona:"' + this.zona + '"';
    }

    if (this.localidad !== '') {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      this.filters += 'Localidad:"' + this.localidad + '"';
    }

    if (this.isMinArea === true) {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      this.filters += 'AreaConstruida';
      this.rangeArea = true;
    }

    if (this.isMaxArea === true) {
      if (this.rangeArea) {
        this.filters += ':' + this.minArea + ' TO ' + this.maxArea;
      } else if (this.multipleFilters) {
        this.filters += ' AND ';
        this.filters += 'AreaConstruida < ' + this.maxArea;
      } else {
        this.multipleFilters = true;
      }
    } else if (this.rangeArea) {
      this.filters += ' > ' + this.minArea;
    }

    if (this.isArriendo === true) {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      if (this.isMinPriceArriendo) {
        if (this.isMaxPriceArriendo) {
          this.filters += 'MontoArriendo:' + (this.minPriceArriendo + 1) + ' TO ' + this.maxPriceArriendo;
        } else {
          this.filters += 'MontoArriendo > ' + (this.minPriceArriendo + 1);

        }
      } else if (this.isMaxPriceArriendo) {
        this.filters += 'MontoArriendo < ' + this.maxPriceArriendo;
      } else {
        this.filters += 'MontoArriendo > 1';
      }
    }

    if (this.isVenta === true) {
      if (this.multipleFilters) {
        this.filters += ' AND ';
      } else {
        this.multipleFilters = true;
      }
      if (this.isMinPriceVenta) {
        if (this.isMaxPriceVenta) {
          this.filters += 'MontoVenta:' + (this.minPriceVenta * 1000000 + 1) + ' TO ' + (this.maxPriceVenta * 1000000);
        } else {
          this.filters += 'MontoVenta > ' + (this.minPriceVenta * 1000000 + 1);

        }
      } else if (this.isMaxPriceVenta) {
        this.filters += 'MontoVenta < ' + (this.maxPriceVenta * 1000000);
      } else {
        this.filters += 'MontoVenta > 1';
      }
    }

    indexAlg.search(this.searchTerm, {
      // @ts-ignore
      filters: this.filters
    }).then(({hits}) => {
      // @ts-ignore
      this.inmuebles = hits;
    });
    console.log(this.filters);
    this.multipleFilters = false;
    this.rangeArea = false;

    if (this.inmuebles.length === 0) {
      alert('No hay resultados de búsqueda');
      this.searchTerm = '';
      this.inmuebles = [];
    } else {
      console.log(this.inmuebles);
      this.madeSearch = true;
      console.log('End Search');
    }
  }

  getMinVentaSliderValue(event: any) {
    this.minPriceVenta = event.target.value;
  }

  getMaxVentaSliderValue(event: any) {
    this.maxPriceVenta = event.target.value;
  }

  getMinArriendoSliderValue(event: any) {
    this.minPriceArriendo = event.target.value;
  }

  getMaxArriendoSliderValue(event: any) {
    this.maxPriceArriendo = event.target.value;
  }

  getMinAreaSliderValue(event: any) {
    this.minArea = event.target.value;
  }

  getMaxAreaSliderValue(event: any) {
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
      if (this.inmuebles[i].IDI === idInmueble) {
        if (this.inmuebles[i].DirFotos !== undefined && this.inmuebles[i].DirFotos.length > 0) {
          return this.inmuebles[i].DirFotos[0];
        }
      }
    }
  }

  verInmueble(idInm: string) {
    console.log('Entre a la Funcion');
    const id = 10;
    this.router.navigate(['public/search/ver-inmueble/' + idInm]);

  }

  clean() {
    this.madeSearch = false;
    this.darInmuebles();
    window.location.reload();
  }

}
