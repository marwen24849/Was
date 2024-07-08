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
  selector: 'app-publish-automation-dialog',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './publish-automation-dialog.component.html',
  styleUrl: './publish-automation-dialog.component.css'
})
export class PublishAutomationDialogComponent {


  newAutomation: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PublishAutomationDialogComponent>,
    private workflowService: WorkflowService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.newAutomation = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      version: ['', Validators.required]
    });
  }


  onSave(): void {
    if (this.newAutomation.valid) {
      const projectId = this.data.projectId;

      this.workflowService.convertProjectToAutomation(projectId, this.newAutomation.value.name, this.newAutomation.value.description, this.newAutomation.value.version).subscribe({
        next: (data: any) => {
          console.log(data);
          // this.router.navigate(['/designer', data.id]);
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          console.error('Error creating group:', error);
        }
      });
      this.dialogRef.close(this.newAutomation.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
