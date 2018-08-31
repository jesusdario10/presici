import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCargosComponent } from './edit-cargos.component';

describe('EditCargosComponent', () => {
  let component: EditCargosComponent;
  let fixture: ComponentFixture<EditCargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
