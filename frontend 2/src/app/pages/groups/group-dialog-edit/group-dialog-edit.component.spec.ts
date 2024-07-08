import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDialogEditComponent } from './group-dialog-edit.component';

describe('GroupDialogEditComponent', () => {
  let component: GroupDialogEditComponent;
  let fixture: ComponentFixture<GroupDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDialogEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
