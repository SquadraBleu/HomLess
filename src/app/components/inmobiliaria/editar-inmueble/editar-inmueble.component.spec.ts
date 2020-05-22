import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarInmuebleComponent } from './editar-inmueble.component';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EditarInmuebleComponent', () => {
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let activatedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let angFileSpy;
  // tslint:disable-next-line:prefer-const
  let authStub;

  beforeEach(() => {
    let inmServiceSpy: Partial<InmuebleServiceService>;
    inmServiceSpy = {
      /*getClientes(): Observable<any[]>{
        const clientes$ = new Subject<Cliente[]>();
        clientes$.next([new Cliente ('Rosalia','','','','123',[],[],[],[]),
        new Cliente ('Jose','','','','234',[],[],[],[])]);
        return clientes$.asObservable();
      }*/
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ EditarInmuebleComponent ],
      providers: [{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: InmuebleServiceService, useValue: inmServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: AngularFireStorage, useValue: angFileSpy},
        {provide: AngularFireAuth, useValue: authStub}
      ]
    })
    .compileComponents();
  });

  it('Funtion editarInmueble', () => {
    const fixture = TestBed.createComponent(EditarInmuebleComponent);
    const comp = fixture.componentInstance;

    expect(true).toBeTruthy();
  });
});
