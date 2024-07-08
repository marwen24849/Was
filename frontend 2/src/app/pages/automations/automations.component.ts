
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WorkflowService } from '../../core/service/workflow/workflow.service';
import { FormsModule } from '@angular/forms';
import { DaySincePipe } from '../../core/pipes/day-since.pipe';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-automations',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule,
    MatPaginatorModule, MatMenuModule, MatRippleModule,
    MatButtonModule, MatFormFieldModule, FormsModule, 
    DaySincePipe, DatePipe],
  templateUrl: './automations.component.html',
  styleUrl: './automations.component.scss'
})
export class AutomationsComponent {

  displayedColumns: string[] = ['name', 'id', 'description', 'actions'];


  searchText: string = '';


  automations!: any[]
  totalAutomations!: number;
  displayedAutomations: any[] = [];
  pageSize = 5;



  constructor(private workflowService: WorkflowService) { }

  ngOnInit() {
    this.fetchAllAutomations();



  }


  fetchAllAutomations(): void {
    this.workflowService.getAllAutomations().subscribe(
      (data: any[]) => {
        this.automations = data;
        this.totalAutomations = this.automations.length;
        this.updateDisplayedAutomations();
      },
      (error) => {
        console.error('Error fetching automations:', error);
      }
    );
  }

  toggleAutomationStatus(automation: any): void {
    automation.valid = !automation.valid;
    console.log("automation", automation, "valid")
    // Add your logic here to handle the status change,
    // e.g., sending an update to the server or performing some action.
  }



































  updateDisplayedAutomations(): void {
    const filteredAutomations = this.filterAutomations(this.automations, this.searchText);
    this.totalAutomations = filteredAutomations.length;
    this.displayedAutomations = filteredAutomations.slice(0, this.pageSize);
  }

  filterAutomations(automations: any[], searchText: string): any[] {
    if (!searchText.trim()) {
      return automations;
    }
    const lowerCaseSearch = searchText.toLowerCase();
    return automations.filter(automation =>
      automation.name.toLowerCase().includes(lowerCaseSearch) ||
      automation.description.toLowerCase().includes(lowerCaseSearch)
    );
  }


  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const filteredAutomations = this.filterAutomations(this.automations, this.searchText);
    this.displayedAutomations = filteredAutomations.slice(startIndex, startIndex + pageSize);
  }


  applyFilter(): void {
    this.updateDisplayedAutomations();
  }





























}

