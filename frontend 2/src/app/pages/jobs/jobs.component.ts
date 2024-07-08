import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule,
    MatButtonModule, MatFormFieldModule,FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  displayedColumns: string[] = ['name', 'id', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  jobs!: any[]
  totalJobs!: number;
  displayedJobs: any[] = [];
  pageSize = 5;
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() {


  }
  



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }





































  updateDisplayedJobs(): void {
    const filteredLibraries = this.filterJobs(this.jobs, this.searchText);
    this.totalJobs = filteredLibraries.length;
    this.displayedJobs = filteredLibraries.slice(0, this.pageSize);
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const filteredJobs = this.filterJobs(this.jobs, this.searchText);
    this.displayedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);
  }






  filterJobs(projects: any[], searchText: string): any[] {
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
    this.updateDisplayedJobs();
  }
}

const ELEMENT_DATA: any[] = [
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", description: "Admin user" },
];