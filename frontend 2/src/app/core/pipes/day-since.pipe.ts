import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Pipe({
  name: 'daySince',
  standalone: true
})
export class DaySincePipe implements PipeTransform {

  // transform(value: string): number {
  //   if (!value) return 0;

  //   const givenDate = new Date(value);
  //   const today = new Date();


  //   return differenceInDays(today, givenDate);
  // }
  transform(value: string): string {
    if (!value) return 'N/A'; // Handle cases where value is not provided

    const givenDate = new Date(value);
    const today = new Date();

    const diffDays = differenceInDays(today, givenDate);

    if (diffDays === 0) {
      return 'today';
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  }

}
