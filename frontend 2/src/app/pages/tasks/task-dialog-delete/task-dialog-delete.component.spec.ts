import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogDeleteComponent } from './task-dialog-delete.component';

describe('TaskDialogDeleteComponent', () => {
  let component: TaskDialogDeleteComponent;
  let fixture: ComponentFixture<TaskDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
