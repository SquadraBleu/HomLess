import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVerPerfilComponent } from './client-ver-perfil.component';

describe('ClientVerPerfilComponent', () => {
  let component: ClientVerPerfilComponent;
  let fixture: ComponentFixture<ClientVerPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientVerPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVerPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
