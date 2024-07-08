import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakOperationService } from '../../../keycloak-operation.service';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, SideNavComponent, KeycloakAngularModule],
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  constructor(public kc: KeycloakService,  private keyCloakService: KeycloakOperationService) { }
  username:any
  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.kc.isLoggedIn();
    if (this.keyCloakService.isLoggedIn()) {
      this.username = sessionStorage.getItem('username');
      console.log(this.username);
    }
  }

  async onlogOut() {
    sessionStorage.removeItem('username');
    this.keyCloakService.logout()
  }

  async login() {
    this.keyCloakService.login()
  }

  isLogIn():boolean{
    return this.keyCloakService.isLoggedIn()
  }

  @Output() SideNavToggle = new EventEmitter<void>();

  openSidenav() {
    this.SideNavToggle.emit();
    console.log("toggled from app bar");
  }
}
