import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditarPerfilComponent } from './client-editar-perfil.component';
import { convertToParamMap, Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ClientEditarPerfilComponent', () => {
  let activatedRouteSpy = { snapshot: { paramMap: convertToParamMap( { 'id': '123' } ) } };;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let authServiceSpy;


  beforeEach(() => {
    let cliServiceSpy: Partial<ClientService>;
    cliServiceSpy = {
      getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Rosalia','','','','123',[],[],[],[]),
        new Cliente ('Jose','','','','234',[],[],[],[])]);
        return clientes$.asObservable();
      }
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ ClientEditarPerfilComponent ],
      providers: [{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: ClientService, useValue: cliServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
  });

  it('should darCliente', () => {
    const fixture = TestBed.createComponent(ClientEditarPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(comp, 'darCliente');
    comp.id = '123';
    comp.darCliente();
    expect(comp.cliente.Nombre).toBe('Rosalia');
  });
});
