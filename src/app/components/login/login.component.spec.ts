import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../models/user';
import {FormGroup, FormControl, Validator, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';



describe('LoginComponent', () => {
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
      ]
    }).compileComponents();
  });
  it('should got logged', (() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    const deb = fixture.debugElement.query(By.css('form'));
    let ele = deb.nativeElement;
    fixture.detectChanges();
    spyOn(comp, 'onLogin');
    ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.loginForm.controls.email.setValue('amarillo@inmobiliaria.com');
    comp.loginForm.controls.password.setValue('amarillo');
    ele.click();
    expect(comp.isError).toBeFalse();
  }));
});




