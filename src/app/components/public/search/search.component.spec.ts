import {async, ComponentFixture, TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {BusquedaService} from 'src/app/services/busqueda.service';
import {AuthService} from 'src/app/services/auth.service';
import {InmuebleServiceService} from 'src/app/services/inmueble-service.service';
import {ClientService} from 'src/app/services/client.service';
import {Observable, Subject} from 'rxjs';
import {Tag} from '../../../models/tag';

describe('SearchComponent', () => {  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:prefer-const
  let busquedaServiceSpy;
  // tslint:disable-next-line:prefer-const
  // let mockAuthService;
  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:prefer-const
  let clienteServiceSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const

  beforeEach(() => {
    /*let userMocker = authServiceSpy.isAuth();
    let ObservableMocker: Observable<any[]> = [];
    let mockAuthService: any = {
      isAuth: () => userMocker,
    };
    let inmuebleServiceSpy: any = {
      getTags: () => ObservableMocker,
    };*/
    let mockAuthService: Partial<AuthService>;
    mockAuthService = {
      isAuth(): Observable<firebase.User> {
        return new Observable<firebase.User>();
      }
    };
    let inmuebleServiceSpy: Partial<InmuebleServiceService>;
    inmuebleServiceSpy = {
      getTags(): Observable<any[]> {
        const observable$ = new Subject<Tag[]>();
        observable$.next([new Tag('Parqueadero', [], '')]);
        return  observable$.asObservable();
      }
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SearchComponent],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: BusquedaService, useValue: busquedaServiceSpy},
        {provide: InmuebleServiceService, useValue: inmuebleServiceSpy},
        {provide: ClientService, useValue: clienteServiceSpy},
        {provide: Router, useValue: routerSpy},
      ]
    }).compileComponents();
    TestBed.inject(AuthService);
  });
/*  it('should got user autenticated', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    const deb = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
    spyOn(comp, 'ngOnInit');
    expect(comp.userUid).toEqual('');
  }));
*/
  // Search Term
  it('should got inmuebles SearchTerm=rsales', ( async () => {
    /* let mockAuthService = TestBed.get(AuthService);
    spyOn(mockAuthService, 'isAuth').and.returnValue( of({
    }));*/
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.searchTerm = ('rsales');
    const query = 'rsales';
    const filters = '';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(4);
    });
  }));
  it('should got inmuebles SearchTerm=Casita', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.searchTerm = ('Casita');
    const query = 'Casita';
    const filters = '';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(8);
    });
  }));

  it('should got inmuebles SearchTerm=Csa', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.searchTerm = ('Csa');
    const query = 'Csa';
    const filters = '';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(8);
    });
  }));

  it('should got inmuebles SearchTerm=Casota', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.searchTerm = ('Casota');
    const query = 'Casota';
    const filters = '';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(8);
    });
  }));

  // Tags
  it('should got inmuebles Tags=Parqueadero,Mascotas', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.tags = ('Parqueadero, Mascotas');
    const query = '';
    const filters = '_tags:"Parqueadero" AND _tags:"Mascotas"';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(1);
    });
  }));

  it('should got inmuebles Tags=Parqueadero,mascotas', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tags = ('Parqueadero, mascotas');
    const query = '';
    const filters = '_tags:"Parqueadero" AND _tags:"mascotas"';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(0);
    });
  }));
  it('should got inmuebles Tags=Mascotas', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tags = ('Mascotas');
    const query = '';
    const filters = '_tags:"Mascotas"';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(6);
    });
  }));
  // Tipo Inmueble y Area
  it('should got inmuebles TipoInmueble=Apartaestudio, 17 < Area < 168', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tipoInmueble = ('Apartaestudio');
    comp.minArea = (17);
    comp.maxArea = (168);
    let filters = '';
    filters += 'TipoInmueble:' + 'Apartaestudio';
    filters += ' AND AreaConstruida:17 TO 168';
    const query = '';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(2);
    });
  }));
  // Zona y Localidad
  it('should got inmuebles Zona=Norte, Localidad=Chapinero', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.zona = ('Norte');
    comp.localidad = ('Chapinero');
    const filters = 'Zona:"Norte" AND Localidad:"Chapinero"';
    const query = '';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(4);
    });
  }));
  it('should got inmuebles Zona=Norte', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.zona = ('Norte');
    const query = '';
    const filters = 'Zona:"Norte"';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(11);
    });
  }));
  // Valor Arriendo y Venta
  it('should got inmuebles 2<PriceArriendo<4, 20<Price<740', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.minPriceArriendo = (2);
    comp.maxPriceArriendo = (4);
    comp.minPriceVenta = (20);
    comp.maxPriceVenta = (740);
    const query = '';
    const filters = 'MontoArriendo:2000001 TO 4000001 AND MontoVenta: 20000001 TO 740000001';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(3);
    });
  }));

  // Número de baños y habitaciones
  it('should got inmuebles Baños=4, Habitaciones=4', ( async () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.nbanos = (4);
    comp.nhabitaciones = (4);
    const query = '';
    const filters = 'NBanos = 4 AND NHabitaciones = 4';
    await comp.algoliaTrigger( query, filters).then( hits => {
      console.log(hits);
      expect(hits.length).toEqual(1);
    });
  }));

});
