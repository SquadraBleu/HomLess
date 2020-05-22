import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearRepresentanteComponent } from './crear-representante.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RepresentanteService } from 'src/app/services/representante.service';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { of, Observable, Subject } from 'rxjs';
import { Representante } from 'src/app/models/representante';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';

const authStub: any = {
  authState: {},
  auth: {
    registerUser(correo: string, contraseña: string, inmo: boolean, cli: boolean, repre: Representante) {
      if ( correo === 'amarillo@' && contraseña === '1234'){
        return Promise.resolve();
      }
      else {
        return Promise.reject('Not found User or Bad Credentials');
      }
    }
  }
};

describe('CrearRepresentanteComponent', () => {
  // tslint:disable-next-line:prefer-const
  let activatedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let repreServiceSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let afs: AngularFirestore;


  beforeEach(() => {
    activatedRouteSpy = { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    let inmServiceSpy: Partial<InmuebleServiceService>;
    inmServiceSpy = {
      getInmobiliarias(): Observable<any[]>{
        const inmuebles$ = new Subject<Inmobiliaria[]>();
        const inmo1 = new Inmobiliaria ('', '', '' , '', '', '123', [], '');
        const inmo2 = new Inmobiliaria ('', '', '', '', '', '234', [], '');
        inmuebles$.next([inmo1, inmo2]);

        return inmuebles$.asObservable();
      }
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ CrearRepresentanteComponent ],
      providers: [{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: RepresentanteService, useValue: repreServiceSpy},
        {provide: InmuebleServiceService, useValue: inmServiceSpy},
        {provide: AngularFireAuth, useValue: authStub}]
    })
    .compileComponents();
  });

  /*
  it('Funtion crearRepresentante', () => {
    const fixture = TestBed.createComponent(CrearRepresentanteComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    //et repre = new Representante ('','','','','123',[],'');
    comp.representante = repre;
    comp.idInmobiliria = '123';

    expect(component).toBeTruthy();
  });*/

  it('Funtion crearRepresentante', () => {
    const fixture = TestBed.createComponent(CrearRepresentanteComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.cancelar();
    comp.idInmobiliria = '123';

    expect(routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/lista-representantes/123']);
  });
});
