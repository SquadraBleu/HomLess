import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {SearchComponent} from './search.component';
import {InmuebleServiceService} from '../../../services/inmueble-service.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {BusquedaService} from '../../../services/busqueda.service';
import {ClientService} from '../../../services/client.service';

// tslint:disable-next-line:prefer-const
let inmuebleServiceSpy;
// tslint:disable-next-line:prefer-const
let routerSpy;
// tslint:disable-next-line:prefer-const
let authServiceSpy: Partial<AuthService>;
// tslint:disable-next-line:prefer-const
let busquedaSpy;
// tslint:disable-next-line:prefer-const
let clientSpy;
let fixture;
let comp;
let el;
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ FormsModule ],
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
  el = fixture.nativeElement.querySelector('row alert alert-warning seleccion ng-star-inserted');
});
afterEach(() => {
  fixture.destroy();
});
it('should get six properties', () => {
  fixture.detectChanges();
  const content = el.textContent;
  expect(content).toContain('');
});
