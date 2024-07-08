// import { Injectable } from '@angular/core';
// import Keycloak from 'keycloak-js';
// import { UserProfile } from '../../models/user-profile';

// @Injectable({
//   providedIn: 'root'
// })
// export class KeycloakService {

//   constructor() { }

//   private _keycloak: Keycloak | undefined;
//   private _profile: UserProfile | undefined;
//   private _role: string | undefined;
//   private _token: string | undefined;

//   get keycloak() {
//     if (!this._keycloak) {
//       this._keycloak = new Keycloak(
//         {
//           url: 'http://localhost:8081',
//           realm: 'RPA',
//           clientId: 'rpa'
//         }
//       );
//     }
//     return this._keycloak;
//   }







//   get Profile() {
//     return this._profile;
//   }

//   async init(p0: { config: { url: string; realm: string; clientId: string; }; initOptions: { onLoad: string; silentCheckSsoRedirectUri: string; }; }) {
//     console.log('Keycloak init');
//     const authenticated = await this.keycloak.init({
//       onLoad: 'login-required',

//     });

//     if (authenticated) {
//       this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
//       this._profile.token = this.keycloak.token || '';
//       console.log('Token:', this._profile.token);
//     }



//   }



//   login() {
//     this.keycloak.login();
//   }

//   logout() {
//     this.keycloak.logout(
//       //{redirectUri: 'http://localhost:4200'}
//     );
//   }
// }
