import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterOutlet,
    DashboardComponent, RouterModule, MatDividerModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
