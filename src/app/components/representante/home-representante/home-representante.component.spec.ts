import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRepresentanteComponent } from './home-representante.component';

describe('HomeRepresentanteComponent', () => {
  let component: HomeRepresentanteComponent;
  let fixture: ComponentFixture<HomeRepresentanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
