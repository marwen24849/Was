import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDialogAddComponent } from './schedule-dialog-add.component';

describe('ScheduleDialogAddComponent', () => {
  let component: ScheduleDialogAddComponent;
  let fixture: ComponentFixture<ScheduleDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
