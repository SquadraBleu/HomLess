import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientEditarPerfilComponent } from './client-editar-perfil.component';
import { convertToParamMap, Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Subject, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {By} from '@angular/platform-browser';


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

describe('ClientEditarPerfilComponent', () => {
  // tslint:disable-next-line:prefer-const
  let activatedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let afAuth: AngularFireAuth;
  // tslint:disable-next-line:prefer-const
  let afs: AngularFirestore;

  beforeEach(() => {
    activatedRouteSpy = { snapshot: { paramMap: convertToParamMap( { id: '123' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    authServiceSpy = new AuthService( authStub, afs);
    let cliServiceSpy: Partial<ClientService>;
    cliServiceSpy = {
      getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Rosalia', '', '', '', '123', [], [], [], []),
        new Cliente ('Jose', '', '', '', '234', [], [], [], [])]);
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
        {provide: AngularFireAuth, useValue: authStub}
      ]
    }).compileComponents();
    authStub.authState = of(null);
  });

  /*it('Funtion darCliente', () => {
    const fixture = TestBed.createComponent(ClientEditarPerfilComponent);
    const comp = fixture.componentInstance;
    //fixture.detectChanges();
    //spyOn(comp, 'darCliente');
    comp.id = '123';
    comp.darCliente();
    expect(comp.cliente.Nombre).toBe('Rosalia');
  });*/

  it('Funtion guardarPerfil', () => {
    // tslint:disable-next-line
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'changePassword').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(ClientEditarPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(comp, 'guardarPerfil');
    comp.id = '123';
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;

    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.clientEditarForm.controls.contrasena.setValue('amarillo');
    ele.click();
    // comp.contrasena = 'amarillo';
    // comp.guardarPerfil();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/ver-perfil/123']);
  });

  it('Funtion cancelar', () => {
    const fixture = TestBed.createComponent(ClientEditarPerfilComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = '123';
    // comp.cancelar();
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;

    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    ele.click();

    expect (routerSpy.navigate).toHaveBeenCalledWith(['cliente/ver-perfil/123']);
  });
});
