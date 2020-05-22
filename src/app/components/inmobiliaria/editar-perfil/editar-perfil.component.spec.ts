import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilComponent } from './editar-perfil.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { By } from '@angular/platform-browser';
import { of, Observable, Subject } from 'rxjs';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';

const authStub: any = {
  authState: {},
  auth: {
    changePassword(contrasena: string) {
      if ( contrasena === 'amarillo'){
        return Promise.resolve();
      }
      else {
        return Promise.reject('Not found User or Bad Credentials');
      }
    }
  }
};

describe('EditarPerfilComponent', () => {
  // tslint:disable-next-line:prefer-const
  let activatedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let angularFireSpy;
  // tslint:disable-next-line:prefer-const
  let afAuth: AngularFireAuth;
  // tslint:disable-next-line:prefer-const
  let afs: AngularFirestore;

  beforeEach(() => {
    activatedRouteSpy = { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    authServiceSpy = new AuthService( authStub, afs);
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
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ EditarPerfilComponent ],
      providers: [{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: InmuebleServiceService, useValue: inmServiceSpy},
        {provide: AngularFireStorage, useValue: angularFireSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: AngularFireAuth, useValue: authStub}
      ]
    }).compileComponents();
    authStub.authState = of(null);
  });

  it('Funtion guardarPerfil', () => {
    // tslint:disable-next-line
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'changePassword').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(EditarPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(comp, 'guardarPerfil');
    comp.id = '123';
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;

    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.inmoEditarForm.controls.contrasena.setValue('amarillo');
    ele.click();

    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/ver-perfil/123']);
  });

  it('Funtion cancelar', () => {
    const fixture = TestBed.createComponent(EditarPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = '123';
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;

    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/ver-perfil/123']);
  });
});
