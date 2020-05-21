import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inmueble } from 'src/app/models/inmueble';
import { CrearInmuebleComponent } from './crear-inmueble.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { InmuebleServiceService } from '../../../services/inmueble-service.service';
import {FormsModule} from '@angular/forms';
import {FormGroup, FormControl, Validator, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {By} from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MailService } from 'src/app/services/mail.service';
import { BusquedaService} from '../../../services/busqueda.service';
import { TemplateService } from 'src/app/services/template.service';
import { Tag } from 'src/app/models/tag';


describe('CrearInmuebleComponent', () => {
  let authServiceSpy;
  let routerSpy;
  let inmuServiceSpy;
  let mailServiceSpy;
  let storageSpy;
  let templServiceSpy;
  let busqServiceSpy;
  let activedRouteSpy;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule ,FormsModule, ReactiveFormsModule],
      declarations: [ CrearInmuebleComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: InmuebleServiceService, useValue: inmuServiceSpy},
        {provide: MailService, useValue: mailServiceSpy},
        {provide: AngularFireStorage, useValue: storageSpy},
        {provide: TemplateService, useValue: templServiceSpy},
        {provide: BusquedaService, useValue: busqServiceSpy},
        {provide: ActivatedRoute, useValue: activedRouteSpy},
      ]
    }).compileComponents();
    /*
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule, ReactiveFormsModule],
      declarations: [ CrearInmuebleComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: InmuebleServiceService, useValue: inmuebleSvSSpy},
      ]
    }).compileComponents();*/
  });

  it('Funtion actualizarTags()', () => {
    const fixture = TestBed.createComponent(CrearInmuebleComponent);
    const comp = fixture.componentInstance;
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    /*authServiceSpy = jasmine.createSpyObj('AuthService',['loginByEmail']);
    authServiceSpy.loginByEmail('amarillo@inmobiliaria.com','amarillo');*/
    spyOn(comp,'crearInmueble');
    authServiceSpy = TestBed.inject(AuthService);
    comp.crearInmueble();


    /*
    comp.parqueadero = true;
    comp.transportePublico = true;
    comp.tagsExistentes.push(new Tag('Parqueadero',[],))  
*/
    //authServiceSpy = TestBed.inject(AuthService);
    //authServiceSpy.loginByEmail('amarillo@inmobiliaria.com','amarillo');
    
    
    
    //inmuebleSvSSpy = jasmine.createSpyObj('InmuebleServiceService',['createInmuebles']);
    //comp.userUid = '11ngTgDLozN5TQ86nXYovwuDGph1';
    //spyOn(comp, 'crearInmueble');
    //ele = fixture.debugElement.query(By.css('button')).nativeElement;



    //comp.compararTags(tagsBusqueda,tagsInmueble);
    //Estoy en esta
    expect(true).toBeTruthy();
  });
});
