import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {InmuebleServiceService} from '../../../services/inmueble-service.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {BusquedaService} from '../../../services/busqueda.service';
import {ClientService} from '../../../services/client.service';

let inmuebleServiceSpy;
let routerSpy;
let authServiceSpy: Partial<AuthService>;
let busquedaSpy;
let clientSpy;
let fixture;
let comp;
let el;
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [SearchComponent],
    providers: [{provide: InmuebleServiceService, useValue: inmuebleServiceSpy},
      {provide: AuthService, useValue: authServiceSpy},
      {provide: Router, useValue: routerSpy},
      {provide: BusquedaService, useValue: busquedaSpy},
      {provide: ClientService, useValue: clientSpy}
    ]
  });
  fixture = TestBed.createComponent(SearchComponent);
  comp = fixture.componentInstance;

  let authService;
  authService = TestBed.inject(AuthService);
  el = fixture.nativeElement.querySelector('row alert alert-warning seleccion ng-star-inserted')

});
it('should get six properties', () => {
  fixture.detectChanges();
  const content = el.textContent;
  expect(content).toContain('')
});
