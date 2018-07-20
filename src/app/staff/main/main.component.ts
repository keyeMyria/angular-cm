import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { AlertService } from '../../shared/alert.service';
import { async } from '../../../../node_modules/@types/q';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  requests = [];
  requestsLog = [];
  perPage = 5;
  total = 0;
  loading = true;
  isOpen = false;

  constructor(private requestService: RequestService, private alertService: AlertService) { }

  ngOnInit() {
    //this.getRequest();
  }

  async getRequest(limit: number, offset: number) {
    try {
      let rs: any = await this.requestService.getRequest(limit, offset);

      console.log(rs);
      this.requests = rs.rows;
      this.total = rs.total;
      this.loading = false;

    } catch (error) {

    }

  }

  refresh(state: ClrDatagridStateInterface) {
    console.log(state);
    let offset = +state.page.from;
    let limit = +state.page.to + 1;

    this.getRequest(limit, offset);


  }
  async openModal(request_id: any) {

    try {
      let rs: any = await this.requestService.getLog(request_id);
      console.log(rs);
      if (rs.rows.length) {
        this.requestsLog = rs.rows;
        this.isOpen = true
      } else {
        this.alertService.error();
      }

    } catch (error) {
      this.alertService.error();

    }
    //this.isOpen = true;



  }

  async delRequest(request_id: any) {

    await this.alertService.confirm()
      .then(async () => {
        // ok
        try {
          //console.log(request_id);
          let rs: any = await this.requestService.delRequest(request_id);
          console.log(rs.ok);
          if (rs.ok) {
            this.alertService.success();
            this.getRequest(this.perPage, 0);
          } else {
            this.alertService.error();
          }
        } catch (error) {
          this.alertService.error();

        }


      }).catch(() => {
        //cancel


      });



  }

}
