import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditarPerfilComponent } from './client-editar-perfil.component';

describe('ClientEditarPerfilComponent', () => {
  let component: ClientEditarPerfilComponent;
  let fixture: ComponentFixture<ClientEditarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEditarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEditarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
