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
  selector: 'app-publish-template-dialog',
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
  templateUrl: './publish-template-dialog.component.html',
  styleUrl: './publish-template-dialog.component.css'
})
export class PublishTemplateDialogComponent {
  newGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PublishTemplateDialogComponent>,
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
      const pi = this.data.projectId;

      this.workflowService.convertProjectToTemplate(pi, this.newGroup.value.name, this.newGroup.value.description).subscribe({
        next: (data: any) => {
          console.log(data);
          // this.router.navigate(['/designer', data.id]);
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
