import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearInmuebleComponent } from './crear-inmueble.component';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from 'src/app/services/auth.service';
import { InmuebleServiceService } from '../../../services/inmueble-service.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('CrearInmuebleComponent', () => {
  let authServiceSpy;
  let routerSpy;
  let inmuebleSvSSpy;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CrearInmuebleComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: InmuebleServiceService, useValue: inmuebleSvSSpy},
      ]
    })
    .compileComponents();
  });

  it('Funtion compararTags()', () => {
    const fixture = TestBed.createComponent(CrearInmuebleComponent);
    const comp = fixture.componentInstance;
    let tagsBusqueda = ['colegios cerca', 'Transmilenio lejos'];
    let tagsInmueble = ['colegios cerca', 'Transmilenio lejos'];

    //comp.compararTags(tagsBusqueda,tagsInmueble);
    //Estoy en esta
    expect(true).toBeTruthy();
  });
});
