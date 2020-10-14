import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const floatHours = value / 60;
    const hours = Math.floor(floatHours);
    const floatMinutes = (floatHours - hours) * 60;
    const minutes = Math.round(floatMinutes);
    const formatedHours = hours ? `${hours}h ` : '';
    const formatedMinutes = minutes ? `${minutes}m` : '';
    return `${formatedHours}${formatedMinutes}`;
  }

}
