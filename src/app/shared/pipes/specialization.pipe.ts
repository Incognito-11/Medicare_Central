import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialization'
})
export class SpecializationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
