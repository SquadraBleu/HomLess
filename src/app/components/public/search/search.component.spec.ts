import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {BusquedaService} from 'src/app/services/busqueda.service';
import {AuthService} from 'src/app/services/auth.service';
import {InmuebleServiceService} from 'src/app/services/inmueble-service.service';
import {ClientService} from 'src/app/services/client.service';

describe('SearchComponent', () => {  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:prefer-const
  let busquedaServiceSpy;
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let inmuebleServiceSpy;
  // tslint:disable-next-line:prefer-const
  let clienteServiceSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;

  /*
  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SearchComponent],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: BusquedaService, useValue: busquedaServiceSpy},
        {provide: InmuebleServiceService, useValue: inmuebleServiceSpy},
        {provide: ClientService, useValue: clienteServiceSpy},
        {provide: Router, useValue: routerSpy},
      ]
    }).compileComponents();
  });
  */
/*  it('should got user autenticated', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    const deb = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
    spyOn(comp, 'ngOnInit');
    expect(comp.userUid).toEqual('');
  }));
*/
/*
  // Search Term
  it('should got inmuebles SearchTerm=rsales', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.searchTerm.setValue('rsales');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(4);
  }));
  it('should got inmuebles SearchTerm=Casita', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.searchTerm.setValue('Casita');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(7);
  }));
  it('should got inmuebles SearchTerm=Csa', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.searchTerm.setValue('Csa');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(7);
  }));

  it('should got inmuebles SearchTerm=Casota', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.searchTerm.setValue('Casota');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(7);
  }));

  // Tags
  it('should got inmuebles Tags=Parqueadero,Mascotas', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.tags.setValue('Parqueadero, Mascotas');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(1);
  }));

  it('should got inmuebles Tags=Parqueadero,mascotas', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.tags.setValue('Parqueadero, mascotas');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(0);
  }));
  it('should got inmuebles Tags=Mascotas', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.tags.setValue('Mascotas');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(4);
  }));
  // Tipo Inmueble y Area
  it('should got inmuebles TipoInmueble=Apartaestudio, 17 < Area < 168', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.tipoInmueble.setValue('Apartaestudio');
    comp.SearchForm.controls.minArea.setValue(17);
    comp.SearchForm.controls.maxArea.setValue(168);
    ele.clink();
    expect(comp.inmuebles.length).toEqual(2);
  }));
  // Zona y Localidad
  it('should got inmuebles Zona=Norte, Localidad=Chapinero', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.zona.setValue('Norte');
    comp.SearchForm.controls.localidad.setValue('Chapinero');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(4);
  }));
  it('should got inmuebles Zona=Norte', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.zona.setValue('Norte');
    ele.clink();
    expect(comp.inmuebles.length).toEqual(17);
  }));
  // Valor Arriendo y Venta
  it('should got inmuebles 200<PriceArriendo<400, 700<Price<1400', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.minPriceArriendo.setValue(20000000);
    comp.SearchForm.controls.maxPriceArriendo.setValue(40000000);
    comp.SearchForm.controls.minPriceVenta.setValue(700000000);
    comp.SearchForm.controls.maxPriceVenta.setValue(1400000000);
    ele.clink();
    expect(comp.inmuebles.length).toEqual(2);
  }));

  // Número de baños y habitaciones
  it('should got inmuebles Baños=4, Habitaciones=4', (() => {
    const fixture = TestBed.createComponent(SearchComponent);
    const comp = fixture.componentInstance;
    comp.ngOnInit();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'submitSearch');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.SearchForm.controls.nbanos.setValue(4);
    comp.SearchForm.controls.nhabitaciones.setValue(4);
    ele.clink();
    expect(comp.inmuebles.length).toEqual(1);
  }));

*/
});
