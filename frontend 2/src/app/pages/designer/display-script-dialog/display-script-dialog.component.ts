
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
  selector: 'app-display-script-dialog',
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
  templateUrl: './display-script-dialog.component.html',
  styleUrl: './display-script-dialog.component.css'
})
export class DisplayScriptDialogComponent {

  scriptContent!: string;
  scriptLines!: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private workflowService: WorkflowService) {
    this.fetchScriptContent(data.projectId);
  }


  ngOnInit(): void {
    
    this.scriptLines = this.data.scriptContent.split('\n');

  }

  fetchScriptContent(projectId: string) {
    this.workflowService.getScriptContent(projectId).subscribe(
      (response: any) => {
        this.scriptContent = response;
        console.log(this.scriptContent) 
      },
      (error) => {
        console.error('Failed to fetch script:', error);
        this.scriptContent = error;

      }
    );
  }



  closeDialog(): void {

  }

}
