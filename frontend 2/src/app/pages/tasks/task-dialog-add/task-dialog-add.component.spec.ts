import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogAddComponent } from './task-dialog-add.component';

describe('TaskDialogAddComponent', () => {
  let component: TaskDialogAddComponent;
  let fixture: ComponentFixture<TaskDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
