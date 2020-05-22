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

});
