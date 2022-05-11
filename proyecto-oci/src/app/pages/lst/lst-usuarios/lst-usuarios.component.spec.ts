import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstUsuariosComponent } from './lst-usuarios.component';

describe('LstUsuariosComponent', () => {
  let component: LstUsuariosComponent;
  let fixture: ComponentFixture<LstUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
