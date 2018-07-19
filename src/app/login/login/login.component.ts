import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();
  username: string;
  password: string;
  typeId: any;

  isError = false;

  userTypes = [
    { id: 1, name: 'ผู้ดูแลระบบ' },
    { id: 2, name: 'เจ้าหน้าที่ทั่วไป' },
  ];



  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {

    this.checkToken();
  }

  checkToken() {

    let token = sessionStorage.getItem('token');
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        let decode = this.jwtHelper.decodeToken(token);
        sessionStorage.setItem('fullname', decode.fullname);
        if (decode.usertype === 'staff') {
          this.router.navigateByUrl('/staff')
        } else {
          this.router.navigateByUrl('/admin')
        }

      }
    } else {
      this.isError = true;
    }
  }

  async dologin() {
    try {
      let rs: any = await this.loginService.dologin(
        this.username,
        this.password,
        this.typeId
      );

      if (rs.ok) {
        this.isError = false;
        let token = rs.token;



        sessionStorage.setItem('token', token);

        let decoded = this.jwtHelper.decodeToken(token);
        sessionStorage.setItem('fullname', decoded.firstName);
        console.log(typeof this.typeId)
        if (this.typeId === '1') {
          this.router.navigateByUrl('/admin')
        } else {
          this.router.navigateByUrl('/staff')
        }

      } else {
        this.isError = true;
      }
    } catch (error) {

    }


    // if (this.username === 'admin' && this.password === 'admin') {
    //   // go main page
    //   this.isError = false;
    //   let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzE4MDE0NjIsImV4cCI6MTU2MzMzNzQ2MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZ1bGxuYW1lIjoi4Liq4Li44LiI4Li04LiZ4LiV4LmMIOC4quC4uOC4geC4geC4peC5ieC4siIsIkVtYWlsIjoic3Vra2xhMDFAZ21haWwuY29tIiwidXNlcnR5cGUiOiJhZG1pbiJ9.IbzxLRGzC1JHlEo6CAwdxhNl1XVI8gFGnsmc2ybNgLw';
    //   sessionStorage.setItem('token', token);
    //   console.log(typeof this.typeId)
    //   if (this.typeId === '1') {
    //     this.router.navigateByUrl('/admin')
    //   } else {
    //     this.router.navigateByUrl('/staff')
    //   }


    // } else {
    //   this.isError = true;
    // }
  }

}
