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

  isError= false;

  userTypes = [
    { id: 1, name: 'ผู้ดูแลระบบ' },
    { id: 2, name: 'เจ้าหน้าที่ทั่วไป' },
  ];

  constructor(private router:Router) {

  }

  ngOnInit() {
  }

  dologin() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.typeId);
    if (this.username === 'admin' && this.password === 'admin') {
      // go main page
      this.isError=false;
      this.router.navigateByUrl('/admin')

    } else {
      this.isError = true;
    }
  }

}
