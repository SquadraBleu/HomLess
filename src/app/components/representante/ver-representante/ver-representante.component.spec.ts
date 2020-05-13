import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRepresentanteComponent } from './ver-representante.component';

describe('VerRepresentanteComponent', () => {
  let component: VerRepresentanteComponent;
  let fixture: ComponentFixture<VerRepresentanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
