import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Inmueble } from 'src/app/models/inmueble';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaInmueblesComponent } from './lista-inmuebles.component';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';

describe('ListaInmueblesComponent', () => {
  // tslint:disable-next-line:prefer-const
  let activatedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let inmuServiceSpy;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ListaInmueblesComponent ],
      providers: [{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: InmuebleServiceService, useValue: inmuServiceSpy},
      ]
    }).compileComponents();
  });

  it('Funtion verInmueble ', () => {
    const fixture = TestBed.createComponent(ListaInmueblesComponent);
    const comp = fixture.componentInstance;
    comp.id ='bTujfJUC7zaGKtbFD3eaRXfKlmE3';
    comp.inmuebles.push( new Inmueble('Esta es una propiedad', '', 200, undefined, 2000000, 0, undefined,
    'Una propiedad que esta bien bonita', '', undefined, undefined, '', [], '', '', '', [],""));
    comp.inmuebles.push(new Inmueble('Es una propiedad', '', 200, undefined, 0, 2000000, undefined, 
    'Una propiedad que bien bonita', '', undefined, undefined, '', [], '', '', '', [],""));

    comp.busqueda = 'Esta';
    comp.buscarInmueble();

    expect(comp.inmuebles.length).toEqual(1);
  });

  //dar Inmuebles
  //Boton limpiar busqueda
});
