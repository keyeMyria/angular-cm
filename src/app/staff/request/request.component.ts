import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../shared/standard.service';
import { RequestService } from '../request.service';
import { Router } from '../../../../node_modules/@angular/router';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles: []
})
export class RequestComponent implements OnInit {

  category = [];
  remark: string;
  categiryId: any;
  cause: string;


  constructor(private standard: StandardService,
    private requestService: RequestService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getCategory();
  }

  async getCategory() {
    try {
      let rs: any = await this.standard.getCategory();
      if (rs.ok) {
        this.category = rs.rows;
        console.log(rs);
      }


    } catch (error) {
      console.error(error);

    }
  }

  async save() {
    try {
      let rs: any = await this.requestService.saveRequest(
        this.cause,
        this.categiryId,
        this.remark
      );
      if (rs.ok) {

        this.alertService.success();
        this.router.navigateByUrl('/')
        console.log('ok');
      }


    } catch (error) {

      this.alertService.error();
      console.error(error);

    }
  }

}
