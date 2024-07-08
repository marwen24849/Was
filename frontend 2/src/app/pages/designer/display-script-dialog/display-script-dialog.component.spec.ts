import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayScriptDialogComponent } from './display-script-dialog.component';

describe('DisplayScriptDialogComponent', () => {
  let component: DisplayScriptDialogComponent;
  let fixture: ComponentFixture<DisplayScriptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayScriptDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayScriptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
