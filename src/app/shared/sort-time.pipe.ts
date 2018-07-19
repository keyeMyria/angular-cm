import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sortTime'
})
export class SortTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    moment.locale('th');
    let sTime = moment(value,'HH:mm:ss').format('HH:mm') ;

    return sTime;
  }

}
