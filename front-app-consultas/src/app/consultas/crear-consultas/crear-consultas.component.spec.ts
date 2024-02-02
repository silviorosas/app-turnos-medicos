import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConsultasComponent } from './crear-consultas.component';

describe('CrearConsultasComponent', () => {
  let component: CrearConsultasComponent;
  let fixture: ComponentFixture<CrearConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
