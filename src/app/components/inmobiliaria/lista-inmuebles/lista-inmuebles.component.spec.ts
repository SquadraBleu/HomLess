import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Inmueble } from 'src/app/models/inmueble';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { ListaInmueblesComponent } from './lista-inmuebles.component';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Observable, Subject } from 'rxjs';
import {By} from '@angular/platform-browser';

describe('ListaInmueblesComponent', () => {
  let activatedRouteSpy;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    activatedRouteSpy = { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    let inmuServiceSpy: Partial<InmuebleServiceService>;
    inmuServiceSpy = {
      getInmuebles(): Observable<any[]>{
        const inmuebles$ = new Subject<Inmueble[]>();
        const inmo1 = new Inmueble ('Casa Linda', 'Remanso', 234, 3000,
                              0, 0, 0, '', '', 0, 0, '', [], '123', '', '', [], '', '', '');
        const inmo2 = new Inmueble ('Casa Pequeña', 'Remanso', 234, 3000,
                                0, 0, 0, '', '', 0, 0, '', [], '234', '', '', [], '', '', '');
        console.log(inmo1);
        inmuebles$.next([inmo1]);
        console.log(inmuebles$.asObservable());
        /*inmuebles$.next([new Inmueble ('Casa Pequeña','Remanso',234 ,3000,
        0,0,0,'','',0,0,'',[],'234','','',[], '','','')]);*/
        return inmuebles$.asObservable();
      }
    };

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

  /*it('Funtion darInmuebles ', () => {
    const fixture = TestBed.createComponent(ListaInmueblesComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    //spyOn(comp, 'ngOnInit').and.returnValue();
    comp.id = '123';
    //comp.darInmuebles();
    expect(comp.inmuebles.length).toEqual(1);
  });*/

  it('Funtion agregarInmueble ', () => {
    const fixture = TestBed.createComponent(ListaInmueblesComponent);
    const comp = fixture.componentInstance;
    comp.id = '123';
    comp.agregarInmueble();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/crear-inmueble/123']);
  });

  it('Funtion limpiarBusqueda ', () => {
    const fixture = TestBed.createComponent(ListaInmueblesComponent);
    const comp = fixture.componentInstance;
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;
    el.value = 'someValue';
    el.dispatchEvent(new Event('input'));
    spyOn(comp, 'limpiarBusqueda');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect (comp.busqueda).toEqual('');
  });

  it('Funtion buscarInmueble ', () => {
    const fixture = TestBed.createComponent(ListaInmueblesComponent);
    const comp = fixture.componentInstance;
    const inmu: Inmueble[] = [
      new Inmueble ('Casa Linda', 'Remanso', 234, 3000, 0, 0, 0, '', '', 0, 0, '', [], '123', '', '', [], '', '', ''),
      new Inmueble ('Casa Pequeña', 'Remanso', 234, 3000, 0, 0, 0, '', '', 0, 0, '', [], '234', '', '', [], '', '', '')
    ];
    comp.inmuebles = inmu;
    fixture.detectChanges();
    comp.busqueda = 'Linda';
    comp.buscarInmueble();

    expect (comp.inmuebles.length).toEqual(1);
  });

});
