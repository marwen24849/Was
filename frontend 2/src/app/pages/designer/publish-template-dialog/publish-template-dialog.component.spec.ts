import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTemplateDialogComponent } from './publish-template-dialog.component';

describe('PublishTemplateDialogComponent', () => {
  let component: PublishTemplateDialogComponent;
  let fixture: ComponentFixture<PublishTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishTemplateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
