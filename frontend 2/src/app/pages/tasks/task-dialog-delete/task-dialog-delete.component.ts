import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../core/service/task/task.service';

@Component({
  selector: 'app-task-dialog-delete',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './task-dialog-delete.component.html',
  styleUrl: './task-dialog-delete.component.css'
})
export class TaskDialogDeleteComponent {

  constructor(

    public dialogRef: MatDialogRef<TaskDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,

  ) { }



  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.taskService.deleteTaskById(this.data.id).subscribe({
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
