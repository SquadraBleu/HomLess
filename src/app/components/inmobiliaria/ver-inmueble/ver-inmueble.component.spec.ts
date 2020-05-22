import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inmueble } from 'src/app/models/inmueble';
import { VerInmuebleComponent } from './ver-inmueble.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Observable, Subject, of } from 'rxjs';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Tag } from 'src/app/models/tag';
import { By } from '@angular/platform-browser';


describe('VerInmuebleComponent', () => {
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let angularFSSpy;
  // tslint:disable-next-line:prefer-const
  let activedSpy;

  beforeEach(() => {
    activedSpy =  { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    let mockAuthService: Partial<AuthService>;
    mockAuthService = {
      isAuth(): Observable<firebase.User> {
        return new Observable<firebase.User>();
      }
    };
    let authServiceSpy: Partial<AuthService>;
    authServiceSpy = {
      isUserInmo(userUid: any): Observable<Inmobiliaria>{
        const inmobilaria = of (new Inmobiliaria ('N23131', 'inmo@', '', 'Inmo New', '', '234', [], '123'));
        return inmobilaria;
      },
    };

    let inmuebleSSpy: Partial<InmuebleServiceService>;
    inmuebleSSpy = {
      getInmuebles(): Observable<any[]>{
        const inmuebles$ = new Subject<Inmueble[]>();
        inmuebles$.next([new Inmueble ('Casa Linda', 'Remanso', 234, 3000,
                        0, 0, 0, '', '', 0, 0, '', ['Ubicacion', 'Imagen'], '123' , '', '', [], '', '', '')] );

        inmuebles$.next([new Inmueble ('Casa Pequeña', 'Remanso', 234 , 3000,
        0, 0, 0, '', '', 0, 0, '', [], '234', '', '', [], '', '', '')]);
        return inmuebles$.asObservable();
      },
      getTags(): Observable<any[]>{
        const tags$ = new Subject<Tag[]>();
        tags$.next([new Tag ('Transmilenio', ['123', '234', '567'], ''),
        new Tag ('Colegio', ['234', '567'], '')]);
        return tags$.asObservable();
      },
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ VerInmuebleComponent ],
      providers: [{provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireStorage, useValue: angularFSSpy},
        {provide: InmuebleServiceService, useValue: inmuebleSSpy},
        {provide: ActivatedRoute, useValue: activedSpy},
      ]
    })
    .compileComponents();
  });

  it('Funtion isVenta and isArriendo', () => {
    const fixture = TestBed.createComponent(VerInmuebleComponent);
    const comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.inmueble = new Inmueble('', '', 0, 0, 0, 200000, 0, '', '', 0, 0, '', [], '123', '', '', [], '', '', '');
    expect(comp.isVenta()).toBeTruthy();

    comp.inmueble = new Inmueble('', '', 0, 0, 200000, 0, 0, '', '', 0, 0, '', [], '123', '', '', [], '', '', '');
    expect(comp.isArriendo()).toBeTruthy();
  });

  it('Funtion onRegresar and onEdit', () => {
    const fixture = TestBed.createComponent(VerInmuebleComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.inmueble = new Inmueble('', '', 0, 0, 0, 0, 0, '', '', 0, 0, '', [], '123', '', '', [], '234', '', '');
    comp.onRegresar();

    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/lista-inmuebles/123']);

    comp.onEdit();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/editar-inmueble/234']);
  });

});
