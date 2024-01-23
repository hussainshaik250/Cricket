import { Pipe, PipeTransform, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  private datePipe: DatePipe;

  constructor(private injector: Injector) {
    // Using Injector to get DatePipe
    this.datePipe = this.injector.get(DatePipe);
  }

  transform(timestamp: any): string {
    if (!timestamp || !timestamp.toDate) {
      return '';
    }

    const date = timestamp.toDate();
    return this.datePipe.transform(date, 'MM/dd/yyyy') || '';
  }
}