import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CronParserPipe } from '../../../core/pipes/cron-parser.pipe';


@Component({
  selector: 'app-schedule-dialog-details',
  standalone: true,
  imports: [MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CronParserPipe
  ],
  templateUrl: './schedule-dialog-details.component.html',
  styleUrl: './schedule-dialog-details.component.css'
})
export class ScheduleDialogDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
