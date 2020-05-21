import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inmueble } from 'src/app/models/inmueble';
import { VerInmuebleComponent } from './ver-inmueble.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { InmuebleServiceService } from 'src/app/services/inmueble-service.service';
import { Observable, Subject, of } from 'rxjs';
import { Inmobiliaria } from 'src/app/models/inmobiliaria';


describe('VerInmuebleComponent', () => {
  let routerSpy;
  let angularFSSpy;
  let activedSpy =  { snapshot: { paramMap: convertToParamMap( { 'id': '123' } ) } };

  beforeEach(() => {
    let authServiceSpy: Partial<AuthService>;
    authServiceSpy = {
      isUserInmo(userUid: any): Observable<Inmobiliaria>{
        const inmobilaria = of (new Inmobiliaria ('N23131','inmo@','','Inmo New','','234',[],'123'));
        return inmobilaria;
      },
      /*isAuth():  Observable<firebase.User>{
        return auth: of({ uid: 'ABC23' });
      }*/
      
    };

    let inmuebleSSpy: Partial<InmuebleServiceService>;
    inmuebleSSpy = {
      getInmuebles(): Observable<any[]>{
        const inmuebles$ = new Subject<Inmueble[]>();
        inmuebles$.next([new Inmueble ('Casa Linda','Remanso',234 ,3000,
        0,0,0,'','',0,0,'',['Ubicacion','Imagen'],'123','','',[], '','','')])

        inmuebles$.next([new Inmueble ('Casa Pequeña','Remanso',234 ,3000,
        0,0,0,'','',0,0,'',[],'234','','',[], '','','')])
        return inmuebles$.asObservable();
      }
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ VerInmuebleComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireStorage, useValue: angularFSSpy},
        {provide: InmuebleServiceService, useValue: inmuebleSSpy},
        {provide: ActivatedRoute, useValue: activedSpy},
      ]
    })
    .compileComponents();
  });

  it('Funtion darInmueble', () => {
    const fixture = TestBed.createComponent(VerInmuebleComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.id = '123';
    spyOn(comp, 'darInmueble');
    comp.darInmueble();
    console.log(comp.inmueble.IDInmobiliaria);
    expect(comp.inmueble.IDInmobiliaria).toBe('123');
  });

  /*
  it('Funtion darInmueble', () => {
    const fixture = TestBed.createComponent(VerInmuebleComponent);
    const comp = fixture.componentInstance;
    expect(comp.urlImagenes.length).toBe(2);
  });
*/
});
