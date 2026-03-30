import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readingTime' })
export class ReadingTimePipe implements PipeTransform {
  transform(minutes: number): string {
    if (!minutes || minutes < 1) return '< 1 min de lectura';
    return `${minutes} min de lectura`;
  }
}
