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
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-task-dialog-add',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatSelectModule,
    MatDividerModule, MatListModule, MatIcon],
  templateUrl: './task-dialog-add.component.html',
  styleUrl: './task-dialog-add.component.scss'
})
export class TaskDialogAddComponent {

  newTask: FormGroup;
  groups: Group[] = [];
  selectedGroupId!: string;
  //newTaskProperties: FormArray;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private groupService: GroupService
  ) {
    this.newTask = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      properties: this.fb.array([])
    });
  }

  ngOnInit() {
    this.fetchGroups();
  }
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getNameValue(event: any, index: number) {
    this.newTaskProperties.controls[index].get('propertyName')?.setValue(event.target.value);
  }
  getTypeValue(event: any, index: number) {
    this.newTaskProperties.controls[index].get('propertyType')?.setValue(event.value);
  }

  get newTaskProperties(): FormArray {
    return this.newTask.get('properties') as FormArray;
  }


  addNewProperty(): void {
    const propertyGroup = this.fb.group({
      propertyName: ['', Validators.required],
      propertyType: ['', Validators.required]
    });
    propertyGroup.addControl('propertyName', new FormControl('', Validators.required));
    propertyGroup.addControl('propertyType', new FormControl('', Validators.required));
    this.newTaskProperties.push(propertyGroup);
  }

  removeProperty(index: number): void {
    this.newTaskProperties.removeAt(index);
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++












  onSave(): void {
    console.log(this.newTaskProperties.controls);

    if (this.newTask.value) {
      //console.log(this.newTask.value)
      const properties: any = {};
      if (this.newTaskProperties.length > 0) {
        this.newTaskProperties.controls.forEach((control, index) => {
          const propertyName = control.get('propertyName')?.value;
          const propertyType = control.get('propertyType')?.value;
          properties[propertyName] = { value: null, type: propertyType };
        });
      }
      this.newTask.value.properties = properties;
      this.taskService.createTask(this.newTask.value, this.selectedGroupId).subscribe({
        next: (data: any) => {
          console.log(data);
          this.dialogRef.close(data);
        },
        error: (error: any) => {
          console.error('Error creating group:', error);
        }
      });
      this.dialogRef.close(this.newTask.value);
    }
  }













  onCancel(): void {
    this.dialogRef.close();
  }

}


