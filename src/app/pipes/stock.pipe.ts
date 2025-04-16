import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock',
})
export class StockPipe implements PipeTransform {
  transform(stock: number): { [key: string]: string } {
    if (stock === 0) return { color: 'red' };
    if (stock < 50) return { color: 'yellow' };
    return { color: 'blue' };
  }
}
