import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPerfilComponent } from './ver-perfil.component';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from "@angular/router/testing";

describe('VerPerfilComponent', () => {
  let routerSpy;
  let routeSpy;
  let authServiceSpy;
  let inmuSvcSpy;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ VerPerfilComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: InmuebleServiceService, useValue: inmuSvcSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(VerPerfilComponent);
    const comp = fixture.componentInstance;
    let inmobilia =  new Inmobiliaria(
      '',
      '',
      '',
      '',
      'Direccion', '', [], '');
    comp.inmobiliaria = inmobilia;
    
    expect(comp.getImageUrl()).toBe('Direccion');
  });
});
