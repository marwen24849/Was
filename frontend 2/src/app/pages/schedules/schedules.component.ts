import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DaySincePipe } from '../../core/pipes/day-since.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GroupService } from '../../core/service/group/group.service';
import { TaskService } from '../../core/service/task/task.service';
import { Router, RouterOutlet } from '@angular/router';
import { ScheduleDialogAddComponent } from './schedule-dialog-add/schedule-dialog-add.component';
import { CronParserPipe } from '../../core/pipes/cron-parser.pipe';
import { ScheduleDialogDetailsComponent } from './schedule-dialog-details/schedule-dialog-details.component';
import { ScheduleService } from '../../core/service/schedule.service';


@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule,
    MatButtonModule, MatFormFieldModule, DaySincePipe,
    CommonModule,CronParserPipe],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {

  displayedColumns: string[] = ['id', 'name', 'description', 'start date', 'repetition', 'status', 'actions'];
  // dataSource = new MatTableDataSource<any>(SCHEDULES); robots!: any[]
  totalSchedules!: number;
  schedules!:any;
  displayedSchedules: any[] = [];
  pageSize = 5;
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private scheduleService: ScheduleService, private dialog: MatDialog, private groupService: GroupService,
    private router: Router) { }

  ngOnInit() {
    this.getAllSchedules()


  }

  getAllSchedules(){
    this.scheduleService.getAllSchedules().subscribe({
      next: (schedules: any[]) => {
        this.schedules = schedules;
        this.totalSchedules = this.schedules.length;
        this.updateDisplayedSchedules();
      },
      error: (error: any) => {
        console.error('Error fetching projects:', error);
      }
    });
  }




  updateDisplayedSchedules(): void {
    const filteredSchedules = this.filterSchedules(this.schedules, this.searchText);
    this.totalSchedules = filteredSchedules.length;
    this.displayedSchedules = filteredSchedules.slice(0, this.pageSize);
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const filteredSchedules = this.filterSchedules(this.schedules, this.searchText);
    this.displayedSchedules = filteredSchedules.slice(startIndex, startIndex + pageSize);
  }






  filterSchedules(schedules: any[], searchText: string): any[] {
    if (!searchText.trim()) {
      return schedules;
    }
    const lowerCaseSearch = searchText.toLowerCase();
    return schedules.filter(schedule =>
      schedule.name.toLowerCase().includes(lowerCaseSearch) ||
      schedule.description.toLowerCase().includes(lowerCaseSearch)
    );
  }







  applyFilter(): void {
    this.updateDisplayedSchedules();
  }


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ScheduleDialogAddComponent, {

      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);

      }
    });
  }

  openDialog(schedule: any): void {
    const dialogRef = this.dialog.open(ScheduleDialogDetailsComponent, {
      width: '400px',
      data: schedule,
    });
  }

  toggleScheduleStatus(schedule: any) {
    schedule.active = !schedule.active;
  }














































  filterByStatus(status: string) {
    // this.dataSource.filterPredicate = (data, filter) => {
    //   return data.state.trim().toLowerCase() === status.toLowerCase();
    // };
    // this.dataSource.filter = status.trim().toLowerCase();
  }






  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  


}

export interface Schedule {
  id: string;
  name: string;
  description: string;
  startDate: string; // Using string to simplify data initialization
  intervalType: string;
  intervalValue: number;
  active: boolean;
}



