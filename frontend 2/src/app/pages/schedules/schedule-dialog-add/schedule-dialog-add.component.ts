
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScheduleService } from '../../../core/service/schedule.service';
import { GroupService } from '../../../core/service/group/group.service';
import { Group } from '../../../core/models/interface/Group';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-schedule-dialog-add',
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
  templateUrl: './schedule-dialog-add.component.html',
  styleUrl: './schedule-dialog-add.component.css'
})
export class ScheduleDialogAddComponent {
  newSchedule!: FormGroup;
  groups: Group[] = [];
  selectedGroupId!: string;
  frequency: string[] = ['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly']
  selectedFrequency!: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ScheduleDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scheduleService: ScheduleService,
    private groupService: GroupService) {
    this.newSchedule = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      robotId: [''],
      cronExpression: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchGroups();
  }

  getCronExpression(): string {
    return `${this.cron.second} ${this.cron.minute} ${this.cron.hour} ${this.cron.dayOfMonth} ${this.cron.month} ${this.cron.dayOfWeek}`;
  }

  onFrequencySelectionChange(frequency: string) {
    this.selectedFrequency = frequency;
  }
  cron = {
    second: '*',
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*'
  };















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
    const cronExpression = this.getCronExpression();
    this.newSchedule.patchValue({ cronExpression });

    if (this.newSchedule.valid) {
      console.log(this.newSchedule.value);
      this.scheduleService.createSchedule(this.newSchedule.value).subscribe(
        (response) => {
          console.log('Schedule created successfully:', response);
          this.dialogRef.close(); // Close the dialog upon successful save
        },
        (error) => {
          console.error('Error saving schedule:', error);
          // Handle error scenario
        }
      );

    }
  }
}
