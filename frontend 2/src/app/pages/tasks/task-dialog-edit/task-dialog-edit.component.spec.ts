import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogEditComponent } from './task-dialog-edit.component';

describe('TaskDialogEditComponent', () => {
  let component: TaskDialogEditComponent;
  let fixture: ComponentFixture<TaskDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
