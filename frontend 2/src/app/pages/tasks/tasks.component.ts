import { Component, ViewChild } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../core/models/interface/Task';
import { Group } from '../../core/models/interface/Group';
import { GroupService } from '../../core/service/group/group.service';
import { TaskDialogAddComponent } from './task-dialog-add/task-dialog-add.component';
import { TaskDialogDeleteComponent } from './task-dialog-delete/task-dialog-delete.component';
import { TaskDialogEditComponent } from './task-dialog-edit/task-dialog-edit.component';
import { TaskService } from '../../core/service/task/task.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DaySincePipe } from '../../core/pipes/day-since.pipe';




@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule,
    MatButtonModule, FormsModule, DaySincePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {


  displayedColumns: string[] = ['name', 'description', 'properties', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  actions: any[] = [];
  selectedActionId!: string;
  searchText: string = '';
  libraries!: any[]
  totalLibraries!: number;
  displayedActions: any[] = [];
  pageSize = 5;
  groups!: any;
  route: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private taskService: TaskService,
    private dialog: MatDialog,
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchGroups();
    this.fetchTasks();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  fetchTasksByGroupId(groupId: string) {
    this.taskService.getTasksByGroupId(groupId).subscribe(
      (data: Task[]) => {
        this.dataSource.data = data;
        console.log(data)
      },
      (error: any) => {
        console.error('Error fetching tasks by group ID:', error);
      }
    );
  }

  fetchGroups() {
    this.groupService.getAllGroups().subscribe(
      (data: Group[]) => {
        this.groups = data;
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  fetchTasks() {
    this.taskService.getAllTasks().subscribe(
      (data: Task[]) => {
        console.log(data);
        this.dataSource.data = data;
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }


  getPropertyKeys(properties: any): string[] {
    return Object.keys(properties);
  }







  applyFilter(): void {
    this.updateDisplayedLibraries();
  }

  updateDisplayedLibraries(): void {
    const filteredActions = this.filterActions(this.libraries, this.searchText);
    this.totalLibraries = filteredActions.length;
    this.displayedActions = filteredActions.slice(0, this.pageSize);
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const filteredActions = this.filterActions(this.libraries, this.searchText);
    this.displayedActions = filteredActions.slice(startIndex, startIndex + pageSize);
  }







  filterActions(actions: any[], searchText: string): any[] {
    if (!searchText.trim()) {
      return actions;
    }
    const lowerCaseSearch = searchText.toLowerCase();
    return actions.filter(project =>
      project.name.toLowerCase().includes(lowerCaseSearch) ||
      project.description.toLowerCase().includes(lowerCaseSearch)
    );
  }


  onRowClicked(libraryId: string) {
   
  }

  handleRowClick(libraryId: string) {
    console.log('Clicked row with Library ID:', libraryId);
    this.onRowClicked(libraryId);
  }











  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogAddComponent, {

      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        this.fetchTasks();
      }
    });
  }

  openEditDialog(group: Group): void {

  }




  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogDeleteComponent, {
      data: task
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Task deleted:', result);
        this.fetchTasks();
      }
    });
  }








}
