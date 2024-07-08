import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkflowService } from '../../../core/service/workflow/workflow.service';
import { MyDefinition } from '../../../core/models/interface/MyDefinition';
import { Router } from '@angular/router'; // Import the Router service


@Component({
  selector: 'app-project-add-dialog',
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
    MatInputModule,
  ],
  templateUrl: './project-add-dialog.component.html',
  styleUrl: './project-add-dialog.component.css'
})
export class ProjectAddDialogComponent {
  newGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProjectAddDialogComponent>,
    private workflowService: WorkflowService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router

  ) {
    this.newGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.newGroup.valid) {

      this.workflowService.createProject(this.newGroup.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/designer', data.id]);
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
