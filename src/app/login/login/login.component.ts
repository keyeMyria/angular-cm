import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  typeId: any;

  isError = false;

  userTypes = [
    { id: 1, name: 'ผู้ดูแลระบบ' },
    { id: 2, name: 'เจ้าหน้าที่ทั่วไป' },
  ];

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  dologin() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.typeId);
    if (this.username === 'admin' && this.password === 'admin') {
      // go main page
      this.isError = false;
      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzE4MDE0NjIsImV4cCI6MTU2MzMzNzQ2MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZ1bGxuYW1lIjoi4Liq4Li44LiI4Li04LiZ4LiV4LmMIOC4quC4uOC4geC4geC4peC5ieC4siIsIkVtYWlsIjoic3Vra2xhMDFAZ21haWwuY29tIiwidXNlcnR5cGUiOiIxIn0.RRdbo3hZz3PtpKjMPT27AM2F9AZq4o9x6pCKVbvEGeE';
      sessionStorage.setItem('token', token);
      console.log(typeof this.typeId)
      if (this.typeId === '1') {
        this.router.navigateByUrl('/admin')
      } else {
        this.router.navigateByUrl('/staff')
      }


    } else {
      this.isError = true;
    }
  }

}
