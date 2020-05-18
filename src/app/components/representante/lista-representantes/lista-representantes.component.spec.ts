import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRepresentantesComponent } from './lista-representantes.component';

describe('ListaRepresentantesComponent', () => {
  let component: ListaRepresentantesComponent;
  let fixture: ComponentFixture<ListaRepresentantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRepresentantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRepresentantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
