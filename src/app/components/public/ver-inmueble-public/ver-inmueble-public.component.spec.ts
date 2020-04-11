import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInmueblePublicComponent } from './ver-inmueble-public.component';

describe('VerInmueblePublicComponent', () => {
  let component: VerInmueblePublicComponent;
  let fixture: ComponentFixture<VerInmueblePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerInmueblePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerInmueblePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
