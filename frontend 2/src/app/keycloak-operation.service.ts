import { Injectable, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService{

  
  constructor(private readonly keycloak: KeycloakService) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout();
  }
  getUserProfile() {
    this.keycloak.loadUserProfile().then(profile =>{
      const username = profile.username || 'default_username';
      sessionStorage.setItem('username', username);
      
  }
      
      );
  }

  async login() {
    await this.keycloak.login({
      redirectUri: window.location.origin
    });
    
  }

  // Add other methods as needed for token access, user info retrieval, etc.}
}