import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInmuebleComponent } from './ver-inmueble.component';

describe('VerInmuebleComponent', () => {
  let component: VerInmuebleComponent;
  let fixture: ComponentFixture<VerInmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerInmuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
