import { Injectable } from '@angular/core';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success() {

    swal({
      title: 'success',
      text: 'ดำเนินการเรียบร้อยแล้ว',
      type: 'success',
      timer: 2000,
      // confirmButtonText: 'Cool'
    })
  }
  error() {
    swal({
      title: 'Error!',
      text: 'ผิดพลาด',
      type: 'error',
      confirmButtonText: 'ok'
    })
  }
}
