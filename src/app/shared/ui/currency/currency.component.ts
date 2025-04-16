import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyEnum } from '@/app/core/enums/currency.enum';
import { CurrencyService } from '@/app/core/services/currency.service';

@Component({
  selector: 'app-currency',
  imports: [],
  templateUrl: './currency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyComponent {
  readonly currencies = Object.values(CurrencyEnum);
  private readonly currencyService = inject(CurrencyService);

  protected readonly current = this.currencyService.currency;

  onChange(event: Event): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    this.currencyService.setCurrency(input.value as CurrencyEnum);
  }
}
