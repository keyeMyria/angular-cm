import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../shared/standard.service';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
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
  requestId: any;


  constructor(private standard: StandardService,
    private requestService: RequestService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.requestId = params.requestId;
    })
  }

  async ngOnInit() {
    await this.getCategory();
    if (this.requestId) {
      await this.getDeatil(this.requestId);

    }
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

  async getDeatil(requestId: any) {
    try {
      let rs: any = await this.requestService.getReaquestDetail(requestId);
      if (rs.ok) {
        if (rs.info) {
          this.remark = rs.info.remark;
          this.categiryId = rs.info.request_category_id;
          this.cause = rs.info.request_cause;
        }
      } else {

      }

    } catch (error) {
      this.alertService.error();
      console.error(error);
    }

  }

}
