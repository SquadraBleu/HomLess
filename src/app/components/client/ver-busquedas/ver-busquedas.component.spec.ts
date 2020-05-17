import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBusquedasComponent } from './ver-busquedas.component';

describe('VerBusquedasComponent', () => {
  let component: VerBusquedasComponent;
  let fixture: ComponentFixture<VerBusquedasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerBusquedasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerBusquedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
