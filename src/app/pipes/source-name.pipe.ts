import { Pipe, PipeTransform } from '@angular/core';
import { SourceName } from '../constants/source';

@Pipe({
  name: 'sourceName'
})
export class SourceNamePipe implements PipeTransform {

  transform(value: string): string {
    return SourceName[value];
  }

}
