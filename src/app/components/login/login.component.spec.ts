import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {User} from '../../models/user';
import {FormGroup, FormControl, Validator, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {DebugElement, Injectable} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Test} from 'tslint';
import {of} from 'rxjs';


const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword(email: string, pass: string) {
      if ( email === 'amarillo@inmobiliaria.com' && pass === 'amarillo'){
        return Promise.resolve();
      }
      else if ( email === 'ncp.434@hotmail.com' && pass === 'ncp.434'){
        return Promise.resolve();
      }
      else {
        return Promise.reject('Not found User or Bad Credentials');
      }
    }
  }
};

describe('LoginComponent', () => {
  // tslint:disable-next-line:prefer-const
  let authServiceSpy;
  // tslint:disable-next-line:prefer-const
  let afAuth: AngularFireAuth;
  // tslint:disable-next-line:prefer-const
  let afs: AngularFirestore;
  // tslint:disable-next-line:prefer-const
  let routerSpy;
  beforeEach(() => {
    authServiceSpy = new AuthService( authStub, afs);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireAuth, useValue: authStub}
      ]
    }).compileComponents();
    authStub.authState = of(null);
  });
  it('should refuse to log an Inmobiliaria', fakeAsync(() => {
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.loginForm.controls.email.setValue('amarillo@inmobiliaria.com');
    comp.loginForm.controls.password.setValue('amarill');
    spyOn(comp, 'onLogin').and.callThrough();
    ele.click();
    tick(500);
    expect(comp.email).toMatch('amarillo@inmobiliaria.com');
    expect(comp.password).toMatch('amarill');
    expect(comp.onLogin).toHaveBeenCalled();
    console.log(comp.isError + 'VALUE OF ISERROR');
    expect(comp.isError).toBe(true);
  }));

  it('should got logged as Inmobiliaria', fakeAsync(() => {
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.loginForm.controls.email.setValue('amarillo@inmobiliaria.com');
    comp.loginForm.controls.password.setValue('amarillo');
    spyOn(comp, 'onLogin').and.callThrough();
    ele.click();
    tick(500);
    expect(comp.email).toMatch('amarillo@inmobiliaria.com');
    expect(comp.password).toMatch('amarillo');
    expect(comp.onLogin).toHaveBeenCalled();
    console.log(comp.isError + 'VALUE OF ISERROR');
    expect(comp.isError).toBe(false);
  }));

  it('should got logged as Client', fakeAsync(() => {
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.loginForm.controls.email.setValue('ncp.434@hotmail.com');
    comp.loginForm.controls.password.setValue('ncp.434');
    spyOn(comp, 'onLogin').and.callThrough();
    ele.click();
    tick(500);
    expect(comp.email).toMatch('ncp.434@hotmail.com');
    expect(comp.password).toMatch('ncp.434');
    expect(comp.onLogin).toHaveBeenCalled();
    console.log(comp.isError + 'VALUE OF ISERROR');
    expect(comp.isError).toBe(false);
  }));

  it('should refuse to log a Client', fakeAsync(() => {
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
    mock.auth = authStub.auth;
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('button')).nativeElement;
    comp.loginForm.controls.email.setValue('ncp.434@hotmail.com');
    comp.loginForm.controls.password.setValue('fakepass');
    spyOn(comp, 'onLogin').and.callThrough();
    ele.click();
    tick(500);
    expect(comp.email).toMatch('ncp.434@hotmail.com');
    expect(comp.password).toMatch('fakepass');
    expect(comp.onLogin).toHaveBeenCalled();
    console.log(comp.isError + 'VALUE OF ISERROR');
    expect(comp.isError).toBe(true);
  }));

});




