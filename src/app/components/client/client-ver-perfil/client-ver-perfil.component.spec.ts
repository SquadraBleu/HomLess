import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientVerPerfilComponent } from './client-ver-perfil.component';
import {ActivatedRoute, Router, convertToParamMap} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {AuthService} from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {Cliente} from 'src/app/models/cliente';
import { Observable, Subject, of } from 'rxjs';
import { COMPILER_OPTIONS } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';

const authStub: any = {
  authState: {},
  auth: {
    deleteUser() {
        return Promise.resolve();
    }
  }
};

describe('ClientVerPerfilComponent', () => {
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let activedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let afs: AngularFirestore;

  beforeEach(() => {
    activedRouteSpy =  { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    authServiceSpy = new AuthService( authStub, afs);
    let cliServiceSpy: Partial<ClientService>;
    cliServiceSpy = {
      getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Hola', '123', '234', 'hola@', '456', [], [], [], [])]);
        return clientes$.asObservable();
      }
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ClientVerPerfilComponent ],
      providers: [{provide: ClientService, useValue: cliServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activedRouteSpy},
        {provide: AngularFireAuth, useValue: authStub}]
    }).compileComponents();
    authStub.authState = of(null);
  });

  /*
  it('Funtion darCliente', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(comp, 'darCliente');
    comp.id = '123';
    comp.darCliente();
    expect(comp.cliente.Cedula).toBe("123");
  });*/

  it('Funtion editarPerfil', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = 'ABC';
    comp.editarPerfil();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/editar-perfil/ABC']);
  });

  it('Funtion verBusquedas', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = 'ABC';
    comp.verBusquedas();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/ver-busqueda/ABC']);
  });

  /*it('Funtion borrarPerfil', () => {
    // tslint:disable-next-line
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'deleteUser').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    //routerSpy = {navigate: jasmine.createSpy('navigate')};
    fixture.detectChanges();


    comp.borrarPerfil();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/public/home']);
  });*/

});
