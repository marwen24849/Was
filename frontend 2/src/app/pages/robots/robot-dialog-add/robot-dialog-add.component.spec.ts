import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDialogAddComponent } from './robot-dialog-add.component';

describe('RobotDialogAddComponent', () => {
  let component: RobotDialogAddComponent;
  let fixture: ComponentFixture<RobotDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
