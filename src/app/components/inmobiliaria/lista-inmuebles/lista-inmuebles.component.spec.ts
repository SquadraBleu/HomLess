import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInmueblesComponent } from './lista-inmuebles.component';

describe('ListaInmueblesComponent', () => {
  let component: ListaInmueblesComponent;
  let fixture: ComponentFixture<ListaInmueblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInmueblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
