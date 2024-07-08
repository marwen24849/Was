
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DaySincePipe } from '../../core/pipes/day-since.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GroupService } from '../../core/service/group/group.service';
import { TaskService } from '../../core/service/task/task.service';
import { Router, RouterOutlet } from '@angular/router';
import { RobotDialogAddComponent } from './robot-dialog-add/robot-dialog-add.component';
import { Subscription, switchMap, timer } from 'rxjs';
import { RobotService } from '../../core/service/robots/robot.service';


@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule,
    MatButtonModule, MatFormFieldModule, DaySincePipe,
    CommonModule],
  templateUrl: './robots.component.html',
  styleUrl: './robots.component.scss'
})
export class RobotsComponent {
  displayedColumns: string[] = ['id', 'name', 'state', 'logs', 'actions'];
  dataSource = new MatTableDataSource<any>(CONTAINERS);


  robots: any[] = [];
  displayedRobots: any[] = [];
  totalRobots = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  refreshSubscription!: Subscription;

  constructor(private robotService: RobotService) { }

  ngOnInit() {
    //this.displayedRobots = this.dataSource.data
    this.refreshRobots();


  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }



  refreshRobots(): void {
    this.refreshSubscription = timer(0, 5000)  // Refresh every 5 seconds
      .pipe(switchMap(() => this.robotService.getAllRobots())) // Assuming getAllRobots() fetches data from backend
      .subscribe(
        (robots: any[]) => {
          this.robots = robots;
          this.totalRobots = this.robots.length;
          this.updateDisplayedRobots();
        },
        error => {
          console.error('Error fetching robots:', error);
        }
      );
  }


  updateDisplayedRobots(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedRobots = this.robots.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedRobots();
  }







  openAddDialog(): void {
    // const dialogRef = this.dialog.open(RobotDialogAddComponent, {

    //   data: {}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Dialog result:', result);

    //   }
    // });
  }













































  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByStatus(status: string) {
    this.dataSource.filterPredicate = (data, filter) => {
      return data.state.trim().toLowerCase() === status.toLowerCase();
    };
    this.dataSource.filter = status.trim().toLowerCase();
  }




  clearSearch() {
    this.applyFilter('');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }





}

export interface Container {
  id: string;
  name: string;
  state: string;
  logs: any;
  actions: string;
}

const robotRunData = {
  name: '789Fff012 Script',
  activityCount: 2,
  activities: [
    {
      activityName: 'Input Text',
      tasks: [{ taskName: 'id=email', status: 'FAIL' }],
      status: 'FAIL',
      message: "No keyword with name 'id=email' found."
    },
    {
      activityName: 'Input Text',
      tasks: [{ taskName: 'id=phone', status: 'FAIL' }],
      status: 'FAIL',
      message: "No keyword with name 'id=phone' found."
    }
  ],
  status: 'FAIL',
  finalMessage: 'Execution completed'
};

export const CONTAINERS: Container[] = [
  {
    id: '1a2b3c4d5e',
    name: 'web_server',
    state: 'Running',
    logs: 'Database shutdown completed...',
    actions: 'Start, Stop, Restart'
  },
  {
    id: '6f7g8h9i0j',
    name: 'db_server',
    state: 'Stopped',
    logs: 'Database shutdown completed...',
    actions: 'Start, Remove'
  },
  {
    id: 'k1l2m3n4o5',
    name: 'cache_server',
    state: 'Running',
    logs: 'Cache warmed up and ready...',
    actions: 'Stop, Restart'
  },
  {
    id: 'p6q7r8s9t0',
    name: 'auth_service',
    state: 'Paused',
    logs: 'Authentication service paused...',
    actions: 'Resume, Remove'
  },
  {
    id: 'u1v2w3x4y5',
    name: 'notification_service',
    state: 'running',
    logs: 'Notifications sent successfully...',
    actions: 'Stop, Restart'
  },
  {
    id: 'u1v2w3x4y5',
    name: 'notification_service',
    state: 'running',
    logs: 'Notifications sent successfully...',
    actions: 'Stop, Restart'
  },
  {
    id: 'u1v2w3x4y5',
    name: 'notification_service',
    state: 'running',
    logs: 'Notifications sent successfully...',
    actions: 'Stop, Restart'
  }
];
