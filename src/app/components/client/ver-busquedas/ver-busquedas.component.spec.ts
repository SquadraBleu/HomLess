import {ComponentFixture, TestBed} from '@angular/core/testing';
import {VerBusquedasComponent} from './ver-busquedas.component';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
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
  let router: Router;
  // tslint:disable-next-line:prefer-const
  beforeEach(() => {
    let busquedaServiceSpy: Partial<BusquedaService>;
    busquedaServiceSpy = {
      getBusquedas(): Observable<any[]> {
        const observable$ = new Subject<Busqueda[]>();
        observable$.next(
          [new Busqueda('asdf542asd4f'
            , 'Casita', '', 0, 0,
            0, 0, '', '', 0,
            0, 0, 0, false,
            '', [], '', 5)
          ]);
        return observable$.asObservable();
      },
      updateBusqueda(value: any, id: string): Promise<void> {
        return Promise.resolve();
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
      ]
    }).compileComponents();
  });
  it('should activate de search', () => {
    let fixture: ComponentFixture<VerBusquedasComponent>;
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(VerBusquedasComponent);
    const component = fixture.componentInstance;
    component.busquedas.push(new Busqueda('asdf542asd4f'
      , 'Casita', '', 0, 0,
      0, 0, '', '', 0,
      0, 0, 0, false,
      '', [], '', 5)
    );
    component.id = 'asdfasd65f54';
    spyOn(component, 'reload').and.returnValue();
    component.activarBusqueda(0);
    expect(component.busquedas[0].SiNotificacion).toBeTrue();
  });

  it('should desactivate the search', () => {
    let fixture: ComponentFixture<VerBusquedasComponent>;
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(VerBusquedasComponent);
    const component = fixture.componentInstance;
    component.busquedas.push(new Busqueda('asdf542asd4f'
      , 'Casita', '', 0, 0,
      0, 0, '', '', 0,
      0, 0, 0, true,
      '', [], '', 5)
    );
    component.id = 'asdfasd65f54';
    spyOn(component, 'reload').and.returnValue();
    console.log(component.id);
    console.log(component.busquedas[0]);
    const navigateSpy = spyOn( router, 'navigate');
    component.desactivarBusqueda(0);
    const expected = 'cliente/ver-busqueda/' + component.id;
    expect(component.busquedas[0].SiNotificacion).toBeFalse();
  });

  it('should delete a search', () => {
    let fixture: ComponentFixture<VerBusquedasComponent>;
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(VerBusquedasComponent);
    const component = fixture.componentInstance;
    component.busquedas.push(new Busqueda('123'
      , 'Casita1', '', 0, 0,
      0, 0, '', '', 0,
      0, 0, 0, false,
      '', [], '', 5)
    );
    component.busquedas.push(new Busqueda('345'
      , 'Casita2', '', 0, 0,
      0, 0, '', '', 0,
      0, 0, 0, false,
      '', [], '', 5)
    );
    component.busquedas.push(new Busqueda('678'
      , 'Casita3', '', 0, 0,
      0, 0, '', '', 0,
      0, 0, 0, false,
      '', [], '', 5)
    );
    component.id = 'asdfasd65f54';
    spyOn(component, 'reload').and.returnValue();
    console.log(component.id);
    console.log(component.busquedas[0]);
    const navigateSpy = spyOn( router, 'navigate');
    component.eliminarBusqueda(0);
    const expected = 'cliente/ver-busqueda/' + component.id;

    component.busquedas.push(new Busqueda('910'
      , 'Casita4', '', 0, 0,
      0, 0, '', '', 0,
      0, 0, 0, false,
      '', [], '', 5)
    );
    expect(component.busquedas.length).toEqual(3);
  });
});
