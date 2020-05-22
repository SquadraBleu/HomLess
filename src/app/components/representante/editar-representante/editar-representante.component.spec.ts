import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRepresentanteComponent } from './editar-representante.component';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute, Router, convertToParamMap} from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RepresentanteService } from 'src/app/services/representante.service';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Observable, Subject } from 'rxjs';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';
import { Representante } from 'src/app/models/representante';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from 'protractor';

describe('EditarRepresentanteComponent', () => {
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let activatedRouteSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  // tslint:disable-next-line:prefer-const
  let authStub;
  // tslint:disable-next-line:prefer-const
  let afs: AngularFirestore;

  beforeEach(() => {
    activatedRouteSpy = { snapshot: { paramMap: convertToParamMap( { id: '999' } ) } };
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    let inmServiceSpy: Partial<InmuebleServiceService>;
    inmServiceSpy = {
      getInmobiliarias(): Observable<any[]>{
        const inmobiliarias$ = new Subject<Inmobiliaria[]>();
        inmobiliarias$.next([new Inmobiliaria ('', 'InmoA@', '', 'Inmo A', '', '123', [], ''),
        new Inmobiliaria ('', 'InmoB@', '', 'Inmo B', '', '234', [], '')]);
        return inmobiliarias$.asObservable();
      },
    };
    let repreServiceSpy: Partial<RepresentanteService>;
    repreServiceSpy = {
      getRepresentantes(): Observable<any[]>{
        const representantes$ = new Subject<Representante[]>();
        representantes$.next([new Representante ('', 'Pepe', '', '', '123', [], '999'),
        new Representante ('', 'Pepa', '', '', '234', [], '987')]);
        return representantes$.asObservable();
      }
    },

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ EditarRepresentanteComponent ],
      providers: [{provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: RepresentanteService, useValue: repreServiceSpy},
        {provide: InmuebleServiceService, useValue: inmServiceSpy},
        {provide: AngularFireAuth, useValue: authStub}]
    })
    .compileComponents();
  });

  /*it('Funtion darRepresentante and darEmailInmo', () => {
    const fixture = TestBed.createComponent(EditarRepresentanteComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.idRepresentante = '999';
    comp.darRepresentante();
    comp.darEmailInmo();
    expect(comp.representante.UID).toBe('999');
    expect(comp.emailInmo).toBe('InmoA@');
  });*/

  it('Funtion confirmarEditar', () => {
    const fixture = TestBed.createComponent(EditarRepresentanteComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.representante = new Representante ('', 'Pepe', '', '', '123', [], '999');
    comp.confirmarEditar();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['inmobiliaria/lista-representantes/123']);
  });
});
