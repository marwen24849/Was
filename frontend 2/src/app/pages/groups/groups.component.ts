import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { GroupDialogAddComponent } from './group-dialog-add/group-dialog-add.component';
import { GroupDialogDeleteComponent } from './group-dialog-delete/group-dialog-delete.component';
import { GroupDialogEditComponent } from './group-dialog-edit/group-dialog-edit.component';
import { Group } from '../../core/models/interface/Group';
import { GroupService } from '../../../app/core/service/group/group.service';
import { Router } from '@angular/router';
import { DaySincePipe } from '../../core/pipes/day-since.pipe';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule,
    MatButtonModule, DaySincePipe, FormsModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {

  displayedColumns: string[] = ['name', 'id', 'description', 'actions'];
  dataSource = new MatTableDataSource<Group>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  searchText: string = '';


  libraries!: any[]
  totalLibraries!: number;
  displayedLibraries: any[] = [];
  pageSize = 5;


  constructor(private groupService: GroupService, private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchGroups();

  }





  fetchGroups() {
    this.groupService.getAllGroups().subscribe(
      (data: Group[]) => {
        console.log(data)
        this.libraries = data;
        this.totalLibraries = this.libraries.length;
        this.updateDisplayedLibraries();
      },
      (error: any) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  onRowClicked(libraryId: string) {
    this.router.navigate(['/tasks', libraryId]);
  }

  handleRowClick(libraryId: string) {
    console.log('Clicked row with Library ID:', libraryId);
    this.onRowClicked(libraryId);
  }





  updateDisplayedLibraries(): void {
    const filteredLibraries = this.filterLibraries(this.libraries, this.searchText);
    this.totalLibraries = filteredLibraries.length;
    this.displayedLibraries = filteredLibraries.slice(0, this.pageSize);
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const filteredProjects = this.filterLibraries(this.libraries, this.searchText);
    this.displayedLibraries = filteredProjects.slice(startIndex, startIndex + pageSize);
  }






  filterLibraries(projects: any[], searchText: string): any[] {
    if (!searchText.trim()) {
      return projects;
    }
    const lowerCaseSearch = searchText.toLowerCase();
    return projects.filter(project =>
      project.name.toLowerCase().includes(lowerCaseSearch) ||
      project.description.toLowerCase().includes(lowerCaseSearch)
    );
  }







  applyFilter(): void {
    this.updateDisplayedLibraries();
  }



















  openAddDialog(): void {
    const dialogRef = this.dialog.open(GroupDialogAddComponent, {

      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the result is the new group, you may want to add it to the list
        console.log('Dialog result:', result);
        this.fetchGroups(); // Re-fetch the groups to include the new one
      }
    });
  }















  openDeleteDialog(group: Group): void {
    const dialogRef = this.dialog.open(GroupDialogDeleteComponent, {
      data: group

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the result is true if the group was confirmed for deletion
        console.log('Group deleted:', result);
        this.fetchGroups();
      }
    });
  }






  openEditDialog(group: Group): void {
    const dialogRef = this.dialog.open(GroupDialogEditComponent, {
      data: { group: group }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the result contains the updated group data
        console.log('Group updated:', result);
        this.fetchGroups();
      }
    });
  }




}


