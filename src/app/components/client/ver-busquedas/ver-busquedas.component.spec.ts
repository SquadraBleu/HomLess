import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {VerBusquedasComponent} from './ver-busquedas.component';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

describe('VerBusquedasComponent', () => {
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [VerBusquedasComponent],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
      ]
    }).compileComponents();
  });
  /*
    it('should activate notifications', (() => {
      const fixture = TestBed.createComponent(VerBusquedasComponent);
      const comp = fixture.componentInstance;
      const deb = fixture.debugElement.query(By.css('form'));
      fixture.detectChanges();
      spyOn(comp, 'activarBusqueda').withArgs(1);
      expect(comp.busquedas[1].SiNotificacion).toBeTrue();
    }));
  */
  it('should get Searches', (() => {
    const fixture = TestBed.createComponent(VerBusquedasComponent);
    const comp = fixture.componentInstance;
    const deb = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
    spyOn(comp, 'ngOnInit');
    // @ts-ignore
    expect(comp.busquedas.length()).toEqual(5);
  }));
});
