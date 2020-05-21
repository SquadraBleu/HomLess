import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientVerPerfilComponent } from './client-ver-perfil.component';
import {ActivatedRoute, Router, convertToParamMap} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {AuthService} from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {Cliente} from 'src/app/models/cliente';
import { Observable, Subject } from 'rxjs';

describe('ClientVerPerfilComponent', () => {
  let authServiceSpy;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let activedRouteSpy =  { snapshot: { paramMap: convertToParamMap( { 'id': '123' } ) } };

  beforeEach(() => {
    let cliServiceSpy: Partial<ClientService>;
    cliServiceSpy = {
      getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Hola','123','234','hola@','456',[],[],[],[])]);
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
        {provide: ActivatedRoute, useValue: activedRouteSpy},]
    }).compileComponents();
    
  });

  it('Funtion darCliente', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    //comp.id = '123';
    expect(comp.cliente.Cedula).toBe("123");
  });

  it('Funtion editarPerfil', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    comp.id = 'ABC';
    comp.editarPerfil();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/editar-perfil/ABC']);
  });

  it('Funtion verBusquedas', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    comp.verBusquedas();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/ver-busquedas']);
  });

  
});
