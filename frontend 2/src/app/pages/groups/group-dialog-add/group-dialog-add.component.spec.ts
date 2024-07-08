import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDialogAddComponent } from './group-dialog-add.component';

describe('GroupDialogAddComponent', () => {
  let component: GroupDialogAddComponent;
  let fixture: ComponentFixture<GroupDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
