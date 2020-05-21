import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inmueble } from 'src/app/models/inmueble';
import { VerInmuebleComponent } from './ver-inmueble.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';


describe('VerInmuebleComponent', () => {
  let authServiceSpy;
  let routerSpy;
  let angularFSSpy;
  let inmuebleSSpy;
  let activedSpy =  { snapshot: { paramMap: convertToParamMap( { 'id': '123' } ) } };

  beforeEach(() => {
    /*let cliServiceSpy: Partial<ClientService>;
    cliServiceSpy = {
      getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Hola','123','234','hola@','456',[],[],[],[])]);
        return clientes$.asObservable();
      }
    };
    let cliServiceSpy: Partial<ClientService>;
    cliServiceSpy = {
      getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Hola','123','234','hola@','456',[],[],[],[])]);
        return clientes$.asObservable();
      }
    };*/
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ VerInmuebleComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireStorage, useValue: angularFSSpy},
        {provide: InmuebleServiceService, useValue: inmuebleSSpy},
        {provide: ActivatedRoute, useValue: activedSpy},
      ]
    })
    .compileComponents();
  });

  it('Funtion isVenta()', () => {
    const fixture = TestBed.createComponent(VerInmuebleComponent);
    const comp = fixture.componentInstance;
   
  });

});
