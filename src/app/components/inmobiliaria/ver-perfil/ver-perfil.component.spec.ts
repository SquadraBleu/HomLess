import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPerfilComponent } from './ver-perfil.component';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from 'src/app/services/client.service';
import { Observable, Subject } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';

describe('VerPerfilComponent', () => {
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let activedSpy;
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;

  beforeEach(() => {
    activedSpy =  { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    let inmSvcSpy: Partial<InmuebleServiceService>;
    inmSvcSpy = {
      getInmobiliarias(): Observable<any[]>{
        const inmuebles$ = new Subject<Inmobiliaria[]>();
        const inmo1 = new Inmobiliaria ('', '', '', 'Inmo A', '', '', [], '123');
        const inmo2 = new Inmobiliaria ('', '', '' , 'Inmo B', '', '', [], '234');
        inmuebles$.next([inmo1, inmo2]);

        return inmuebles$.asObservable();
      }
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ VerPerfilComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: InmuebleServiceService, useValue: inmSvcSpy},
        {provide: ActivatedRoute, useValue: activedSpy},
      ]
    })
    .compileComponents();
  });

  /*it('Funtion darInmobilairia', () => {
    const fixture = TestBed.createComponent(VerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    //spyOn(comp, 'darCliente');
    comp.id = '234';
    comp.darInmobilairia();
    expect(comp.inmobiliaria.UID).toBe("234");
  });*/

  it('Funtion editarPerfil', () => {
    const fixture = TestBed.createComponent(VerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = 'ABC';
    comp.editarPerfil();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/editar-perfil/ABC']);
  });

  it('Funtion verInmuebles', () => {
    const fixture = TestBed.createComponent(VerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = 'ABC';
    comp.verInmuebles();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/lista-inmuebles/ABC']);
  });

  it('Funtion verRepresentantes', () => {
    const fixture = TestBed.createComponent(VerPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = 'ABC';
    comp.verRepresentantes();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/lista-representantes/ABC']);
  });

});
