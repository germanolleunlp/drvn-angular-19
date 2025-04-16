import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock',
})
export class StockPipe implements PipeTransform {
  transform(stock: number): { [key: string]: string } {
    if (stock === 0) return { color: '#fda4af' };
    if (stock < 50) return { color: '#fff3b0' };
    return { color: '#a5d8ff' };
  }
}
