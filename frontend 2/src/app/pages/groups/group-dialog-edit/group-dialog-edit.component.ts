import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GroupService } from '../../../core/service/group/group.service';


import { Group } from '../../../core/models/interface/Group';

@Component({
  selector: 'app-group-dialog-edit',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './group-dialog-edit.component.html',
  styleUrl: './group-dialog-edit.component.scss'
})
export class GroupDialogEditComponent {
  editGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupDialogEditComponent>,
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: { group: Group }
  ) {
    this.editGroup = this.fb.group({
      name: [data.group.name, Validators.required],
      description: [data.group.description, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

    if (this.editGroup.valid) {
      this.groupService.updateGroup(this.data.group.id, this.editGroup.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          console.error('Error creating group:', error);
        }
      });

    }
  }

}
