import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishAutomationDialogComponent } from './publish-automation-dialog.component';

describe('PublishAutomationDialogComponent', () => {
  let component: PublishAutomationDialogComponent;
  let fixture: ComponentFixture<PublishAutomationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishAutomationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishAutomationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
