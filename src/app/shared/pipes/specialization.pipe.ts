import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'specialization' })
export class SpecializationPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return 'General Medicine';
    return value
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }
}
