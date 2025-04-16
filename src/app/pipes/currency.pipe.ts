import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '@/app/core/services/currency.service';
import { CurrencyEnum } from '@/app/core/enums/currency.enum';

@Pipe({
  name: 'currency',
  pure: false,
})
export class CurrencyPipe implements PipeTransform {
  private readonly currencyService = inject(CurrencyService);

  transform(value: number): string {
    if (this.currencyService.currency() === CurrencyEnum.EUR) return `€${(value * 1.08).toFixed(2)}`;
    return `$${value}`;
  }
}
