import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientVerPerfilComponent } from './client-ver-perfil.component';
import {ActivatedRoute, Router, convertToParamMap} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {AuthService} from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {Cliente} from 'src/app/models/cliente';
import { Observable, Subject } from 'rxjs';
import { COMPILER_OPTIONS } from '@angular/core';

describe('ClientVerPerfilComponent', () => {
  let authServiceSpy;
  let activedRouteSpy =  { snapshot: { paramMap: convertToParamMap( { 'id': '123' } ) } };
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

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
    fixture.detectChanges();
    spyOn(comp, 'darCliente');
    comp.id = '123';
    comp.darCliente(); 
    expect(comp.cliente.Cedula).toBe("123");
  });

  it('Funtion editarPerfil', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(comp, 'editarPerfil');
    comp.id = 'ABC';
    comp.editarPerfil();
    expect (routerSpy.navigate).toEqual(['cliente/editar-perfil/ABC']);
  });

  it('Funtion verBusquedas', () => {
    const fixture = TestBed.createComponent(ClientVerPerfilComponent);
    const comp = fixture.componentInstance;
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    fixture.detectChanges();
    spyOn(comp, 'verBusquedas');
    comp.id = 'ABC';
    comp.verBusquedas();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/ver-busquedas/ABC']);
  });

  
});
