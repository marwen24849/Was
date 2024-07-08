import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDialogDetailsComponent } from './schedule-dialog-details.component';

describe('ScheduleDialogDetailsComponent', () => {
  let component: ScheduleDialogDetailsComponent;
  let fixture: ComponentFixture<ScheduleDialogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDialogDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleDialogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
