import { Pipe, PipeTransform } from '@angular/core';
import { formatDateTime } from '../utils/date.utils';

@Pipe({
  name: 'appDate',
  standalone: true
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    return formatDateTime(value);
  }
}
