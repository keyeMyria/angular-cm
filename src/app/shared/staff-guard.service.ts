import { Injectable } from '@angular/core';
import { JwtHelperService } from '../../../node_modules/@auth0/angular-jwt';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StaffGuardService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private router : Router) { }

  canActivate() {
    let token = sessionStorage.getItem('token');
    if (token) {
      let decode = this.jwtHelper.decodeToken(token);
      console.log(decode);
      if (decode.usertype === 'staff') {
        return true;
      } else {
        this.router.navigateByUrl('/access-denied');
      }
    } else {
      this.router.navigateByUrl('/login');
      //redirect
    }
  }
}
