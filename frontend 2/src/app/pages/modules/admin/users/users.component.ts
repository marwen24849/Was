import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatTableModule, 
    MatPaginatorModule, MatMenuModule, MatRippleModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})



export class UsersComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'id', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<user>(ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



}
export interface user {
  name: string;
  id: string;
  email: string;
  role: string;
}

const ELEMENT_DATA: user[] = [
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },
  { name: "wassef", id: "sdFsdfsdfsdfDSFSDfsdf", email: "chebbimed@dfds.com", role: "admin" },

];