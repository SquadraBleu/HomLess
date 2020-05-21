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
  it('should got inmuebles SearchTerm=rsales', (() => {
    /* let mockAuthService = TestBed.get(AuthService);
    spyOn(mockAuthService, 'isAuth').and.returnValue( of({
    }));*/
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.searchTerm = ('Nonito');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(4);
  }));
  it('should got inmuebles SearchTerm=Casita', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.searchTerm = ('Casita');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('#')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(7);
  }));
  it('should got inmuebles SearchTerm=Csa', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.searchTerm = ('Csa');
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(7);
  }));

  it('should got inmuebles SearchTerm=Casota', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.searchTerm = ('Casota');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(7);
  }));

  // Tags
  it('should got inmuebles Tags=Parqueadero,Mascotas', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tags = ('Parqueadero, Mascotas');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(1);
  }));

  it('should got inmuebles Tags=Parqueadero,mascotas', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tags = ('Parqueadero, mascotas');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(0);
  }));
  it('should got inmuebles Tags=Mascotas', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tags = ('Mascotas');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(4);
  }));
  // Tipo Inmueble y Area
  it('should got inmuebles TipoInmueble=Apartaestudio, 17 < Area < 168', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.tipoInmueble = ('Apartaestudio');
    comp.minArea = (17);
    comp.maxArea = (168);
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(2);
  }));
  // Zona y Localidad
  it('should got inmuebles Zona=Norte, Localidad=Chapinero', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.zona = ('Norte');
    comp.localidad = ('Chapinero');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(4);
  }));
  it('should got inmuebles Zona=Norte', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.zona = ('Norte');
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(17);
  }));
  // Valor Arriendo y Venta
  it('should got inmuebles 200<PriceArriendo<400, 700<Price<1400', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.minPriceArriendo = (20000000);
    comp.maxPriceArriendo = (40000000);
    comp.minPriceVenta = (700000000);
    comp.maxPriceVenta = (1400000000);
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect(comp.inmuebles.length).toEqual(2);
  }));

  // Número de baños y habitaciones
  it('should got inmuebles Baños=4, Habitaciones=4', ( () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    // spyOn(comp, 'submitSearch');
    comp.nbanos = (4);
    comp.nhabitaciones = (4);
    // comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    expect(comp.currentResults).toEqual(1);
    //ele = fixture.debugElement.nativeElement.querySelector('button');
    //ele.click();
    // await comp.delay(500);
    /*if (comp.finished === true){
      console.log('Número de resultados en el sepc ' + comp.currentResults);
      expect(comp.currentResults).toEqual(1);
    }
    else {
      expect(1).toEqual(0);
    }*/

  }));

});
