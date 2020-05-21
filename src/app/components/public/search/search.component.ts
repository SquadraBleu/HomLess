import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {Inmueble} from 'src/app/models/inmueble';
import {InmuebleServiceService} from 'src/app/services/inmueble-service.service';
import {Busqueda} from 'src/app/models/busqueda';
import {BusquedaService} from 'src/app/services/busqueda.service';
import {ClientService} from 'src/app/services/client.service';
import {environment} from 'src/environments/environment';
import algoliasearch from 'algoliasearch';
import {Tag} from 'src/app/models/tag';
import {firestore} from 'firebase';
import {FormControl, FormGroup, Validators} from '@angular/forms';

const client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
const indexAlg = client.initIndex('inmuebles_search');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private inmuService: InmuebleServiceService,
    private clienteService: ClientService,
    private busquedaService: BusquedaService
  ) {
    // this.searchGroup = new FormGroup({search: new FormControl() });
  }


  IDBusqueda: any = null;
  busqueda = new Busqueda('', '', '', 0, 0, 0, 0, '', '', 0, 0, 0, 0, false, '', [], '', null);
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
  currentResults: any;
  searchTerm = '';
  tags = '';
  newtags = '';
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
  inmuebles: Inmueble[] = [];
  arrayAlltags: Tag[] = [];

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

  ClientLoged: any = null;
  userUid: string = null;
  clientMail = '';
  arraytags: string[];
  arrayIDstags: string [] = [];
  date: any;
  finished: boolean;

  /*
  SearchForm = new FormGroup ({
    searchTerm: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    minArea : new FormControl('', Validators.required),
    maxArea : new FormControl('', Validators.required),
    minPriceArriendo : new FormControl('', Validators.required),
    maxPriceArriendo : new FormControl('', Validators.required),
    minPriceVenta : new FormControl('', Validators.required),
    maxPriceVenta : new FormControl('', Validators.required),
    nhabitaciones : new FormControl('', Validators.required),
    nbanos : new FormControl('', Validators.required),
    zona : new FormControl('', Validators.required),
    localidad : new FormControl('', Validators.required),
    tipoInmueble : new FormControl('', Validators.required)
  });
*/
  ngOnInit(): void {
    console.log(this.authSvc.isAuth());
    this.authSvc.isAuth().subscribe(auth => {
      console.log(auth);
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserClient(this.userUid).subscribe(userRole => {
          if (userRole !== undefined) {
            this.getClientMail();
           // this.getTags();
          }
        });
      }
    });
  }
  async algoliaTrigger(query: string, filterParam: string){
    return indexAlg.search(query, {
      // @ts-ignore
      filters: filterParam
    }).then(({hits}) => {
      // @ts-ignore
      console.log(hits);
      return hits;
    });
  }

  async submitSearch(){
    this.finished = false;
    this.getTags();
    console.log('Init Submit to Algolia tags', this.tags, ' IDS::', this.arrayIDstags);
    this.filters = '';
    this.arrayIDstags = [];
    console.log(this.tags); // String separado por comas, es necesario hacer trim al string completo
                            // y luego a cada string parseado, por si el usuario puso espacios antes o
                            // después de la palabra. Ojo que podrían haber espacios entre el tag y eso sí es válido
    console.log(this.tags);
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
    if (this.tags !== '') {
      console.log('tags before->');
      console.log(this.tags);

      this.arrayIDstags = [];
      console.log(':::Befores TAgs in the search: ', this.arrayIDstags);
      this.getIDTags();
      console.log(':::TAgs in the search: ', this.arrayIDstags);

      if (this.multipleFilters) {

        this.filters += ' AND ';
      }
      this.filters += '_tags:"' + this.tags.replace(new RegExp(', ', 'g'), '" AND _tags:"') + '"';

      this.newtags = this.tags;
    }
    await this.algoliaTrigger(this.searchTerm, this.filters).then(hits => {
      // @ts-ignore
      this.inmuebles = hits;
      this.currentResults = hits.length;
      console.log(hits);
    });
    console.log(this.filters);

    if (this.userUid !== '' && this.clientMail !== '') {
      console.log('GGtags->>>', this.arrayIDstags);
      this.date = firestore.Timestamp.fromDate(new Date());
      this.busqueda = new Busqueda('', this.searchTerm, this.tipoInmueble,
        this.minArea, this.maxArea, this.nhabitaciones, this.nbanos, this.zona, this.localidad,
        this.minPriceVenta, this.maxPriceVenta, this.minPriceArriendo, this.maxPriceArriendo,
        this.activarAlerta, this.userUid, this.arrayIDstags, this.clientMail, this.date);
      console.log('New busqueda antes create', this.busqueda);
      this.createBusqueda();
    }
    this.multipleFilters = false;
    this.rangeArea = false;
    this.filters = '';
    this.tags = '';
    this.arrayIDstags = [];
    if (this.inmuebles.length === 0 && this.madeSearch) {
      alert('No hay resultados de búsqueda');

      this.searchTerm = '';
      this.inmuebles = [];
    } else {
      console.log('made Search value -> ' + this.madeSearch);
      console.log(this.inmuebles);
      this.madeSearch = true;
      console.log('End Search');
    }
    this.finished = true;
    this.currentResults = this.inmuebles.length;
    console.log('Resultados actuales' + this.currentResults);
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getTags() {
   this.inmuService.getTags().subscribe(res => {
        this.arrayAlltags = res;
      }
    );
   console.log('ALL TAGS DB',  this.arrayAlltags);
  }

  getIDTags() {
    this.arraytags = [];
    this.arraytags = this.tags.split(', ');
    console.log('SPLIT: ', this.arraytags);
    this.arrayIDstags = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.arrayAlltags.length; index++) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.arraytags.length; i++) {
        if ( this.arrayAlltags[index].Hashtag.toLowerCase().trim() === this.arraytags[i].toLowerCase().trim()) {
          console.log('array::', this.arrayAlltags[index].id);
          this.arrayIDstags.push(this.arrayAlltags[index].id.trim());
        }
      }
    }

  }


  getClientMail() {
    this.clienteService.getClientes().subscribe(res => {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < res.length; index++) {
          if (res[index].id === this.userUid) {
            this.clientMail = res[index].Correo;
          }
        }
      }
    );
  }

  async createBusqueda() {
    console.log('array', this.arrayIDstags);
    this.busqueda.Tags = this.arrayIDstags;
    console.log('create', this.busqueda);
    await this.busquedaService.createBusqueda(this.busqueda)
      .then(res => {
        this.busqueda.IDBusqueda = res.id;
        console.log('cccc', this.busqueda.IDBusqueda);
        console.log('create', this.busqueda);
        this.busquedaService.updateBusqueda(this.busqueda, this.busqueda.IDBusqueda);
        console.log('update', this.busqueda);
      }).catch(err => console.log('err', err.message));
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
    window.location.reload();
  }

}
