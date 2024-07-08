import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDialogDeleteComponent } from './group-dialog-delete.component';

describe('GroupDialogDeleteComponent', () => {
  let component: GroupDialogDeleteComponent;
  let fixture: ComponentFixture<GroupDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDialogDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
