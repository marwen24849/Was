import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GroupService } from '../../../core/service/group/group.service';


@Component({
  selector: 'app-group-dialog-add',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './group-dialog-add.component.html',
  styleUrls: ['./group-dialog-add.component.scss']
})
export class GroupDialogAddComponent {
  newGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService
  ) {
    this.newGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.newGroup.valid) {
      this.groupService.createGroup(this.newGroup.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          console.error('Error creating group:', error);
        }
      });
      this.dialogRef.close(this.newGroup.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
