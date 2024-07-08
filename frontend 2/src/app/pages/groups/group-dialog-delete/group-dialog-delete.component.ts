import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GroupService } from '../../../core/service/group/group.service';
import { Group } from '../../../core/models/interface/Group';
@Component({
  selector: 'app-group-dialog-delete',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './group-dialog-delete.component.html',
  styleUrl: './group-dialog-delete.component.scss'
})
export class GroupDialogDeleteComponent {

  constructor(

    public dialogRef: MatDialogRef<GroupDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    private groupService: GroupService
  ) {

  }






  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.groupService.deleteGroupById(this.data.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        console.error('Error deleting group:', error);
      }
    });
    this.dialogRef.close(true);
  }



}

// 
