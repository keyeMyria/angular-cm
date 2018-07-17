import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() {

  }
  canActivate() {
    let token=sessionStorage.getItem('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }
}
