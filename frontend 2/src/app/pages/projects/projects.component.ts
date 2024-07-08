
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectAddDialogComponent } from './project-add-dialog/project-add-dialog.component'
import { WorkflowService } from '../../core/service/workflow/workflow.service';
import { Router } from '@angular/router';
import { DaySincePipe } from '../../core/pipes/day-since.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule, MatButtonModule, MatFormFieldModule,
    DaySincePipe, MatProgressSpinnerModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  displayedColumns: string[] = ['name', 'description', 'lastModifiedAt', 'actions'];
  

  searchText: string = '';


  projects!: any[]
  totalProjects!: number;
  displayedProjects: any[] = [];
  pageSize = 5;
  isNavigating: boolean = false; // Flag to track navigation state
  showSpinner: boolean = false;




  constructor(
    private dialog: MatDialog,
    private workflowService: WorkflowService,
    private router: Router) { }

  ngOnInit() {
    this.getProjectsOfCurrentUser();

  }

  getProjectsOfCurrentUser() {
    this.showSpinner = true;
    setTimeout(() => {
      
      this.showSpinner = false;
    }, 500);
    this.workflowService.getProjectsOfCurrentUser().subscribe({
      next: (projects: any[]) => {
        this.projects = projects;
        this.totalProjects = this.projects.length;
        this.updateDisplayedProjects();
      },
      error: (error: any) => {
        console.error('Error fetching projects:', error);
      }
    });
  }










  onRowClicked(projectId: any, index: number) {
    this.showSpinner = true;
    setTimeout(() => {
      this.isNavigating = true;
      this.router.navigate(['/designer', projectId]).then(() => {
        this.isNavigating = false;
        this.showSpinner = false;
      });
    }, 1500);
  }





  updateDisplayedProjects(): void {
    const filteredProjects = this.filterProjects(this.projects, this.searchText);
    this.totalProjects = filteredProjects.length;
    this.displayedProjects = filteredProjects.slice(0, this.pageSize);
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const filteredProjects = this.filterProjects(this.projects, this.searchText);
    this.displayedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);
  }






  filterProjects(projects: any[], searchText: string): any[] {
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
    this.updateDisplayedProjects();
  }

  // clearSearch() {
  //   this.applyFilter('');
  // }







  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProjectAddDialogComponent, {

      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming the result is the new group, you may want to add it to the list
        console.log('Dialog result:', result);

      }
    });
  }



}

