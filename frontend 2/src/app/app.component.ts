import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBarComponent } from './shared/reusableComponents/app-bar/app-bar.component';
import { SideNavComponent } from './shared/reusableComponents/side-nav/side-nav.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatSidenav, MatSidenavModule
} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DesignerComponent } from './pages/designer/designer.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakOperationService } from './keycloak-operation.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppBarComponent, SideNavComponent, MatSidenavModule,
    MatListModule, DesignerComponent, FormsModule, ReactiveFormsModule,KeycloakAngularModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public kc: KeycloakOperationService) { }
  title = 'frontend';
  fixed!: true;




  ngOnInit(): void {
    if (this.kc.isLoggedIn()) {
      this.kc.getUserProfile()
    }
  }

 
}
