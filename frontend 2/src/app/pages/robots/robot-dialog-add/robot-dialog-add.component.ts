
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../core/service/task/task.service';
import { GroupService } from '../../../core/service/group/group.service';
import { Group } from '../../../core/models/interface/Group';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-robot-dialog-add',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule, 
    MatListModule],
  templateUrl: './robot-dialog-add.component.html',
  styleUrl: './robot-dialog-add.component.css'
})
export class RobotDialogAddComponent {

  newTask: FormGroup;
  groups: Group[] = [];
  selectedGroupId!: string;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RobotDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private groupService: GroupService) {
    this.newTask = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      properties: this.fb.array([])
    });
  }

  ngOnInit() {
    this.fetchGroups();
  }

  fetchGroups() {
    this.groupService.getAllGroups().subscribe(
      (data: Group[]) => {
        console.log(data)
        this.groups = data;
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }
  onGroupSelectionChange(groupId: string) {
    this.selectedGroupId = groupId;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

  }


}
