// import { HttpInterceptorFn } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';

// import { KeycloakService } from '../service/keycloak/keycloak.service';
// import { inject } from '@angular/core';



// export const httpTokenInterceptor: HttpInterceptorFn = (request, next) => {


//   const keycloakService = inject(KeycloakService);
//   const token = keycloakService.keycloak?.token;
//   if (token) {
//     const authReq = request.clone({
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${token}`
//       })
//     });
//     return next(authReq);
//   }
//   return next(request);


// };
