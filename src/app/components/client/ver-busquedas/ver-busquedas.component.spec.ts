import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {VerBusquedasComponent} from './ver-busquedas.component';
import {By} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BusquedaService} from '../../../services/busqueda.service';
import {InmuebleServiceService} from '../../../services/inmueble-service.service';
import {Observable, Subject} from 'rxjs';
import {Tag} from '../../../models/tag';
import {Busqueda} from 'src/app/models/busqueda';

describe('VerBusquedasComponent', () => {
  // tslint:disable-next-line:prefer-const
  let routerSpy = {
    navigate: jasmine.createSpy('navigate')
  };
  // tslint:disable-next-line:prefer-const
  let router: Router;
  beforeEach(() => {
    let busquedaServiceSpy: Partial<BusquedaService>;
    busquedaServiceSpy = {
      getBusquedas(): Observable<any[]> {
        const observable$ = new Subject<Busqueda[]>();
        observable$.next(
          [new Busqueda('', 'Casita', '', 0, 0, 0, 0, '', '', 0, 0, 0, 0, false, '', [], '', null)
          ]);
        return observable$.asObservable();
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
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [VerBusquedasComponent],
      providers: [
        {provide: BusquedaService, useValue: busquedaServiceSpy},
        {provide: InmuebleServiceService, useValue: inmuebleServiceSpy},
        {provide: Router, useValue: routerSpy},
      ]
    }).compileComponents();



  });
  it('should click link', () => {
    const fixture = TestBed.createComponent(VerBusquedasComponent);
    const component = fixture.componentInstance;
    router = TestBed.get(Router);
    const navigateSpy = spyOn( router, 'navigate');
    component.activarBusqueda(0);
    expect(navigateSpy).toHaveBeenCalledWith('cliente/ver-busqueda/' + component.id);
  });

});
