import { Injectable, signal } from '@angular/core';
import { CurrencyEnum } from '@/app/core/enums/currency.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  readonly currency = signal<CurrencyEnum>(CurrencyEnum.USD);

  constructor() {
    toObservable(this.currency)
      .pipe(distinctUntilChanged())
      .subscribe((currency) => {
        try {
          localStorage.setItem('app-currency', currency);
        } catch (error) {
          console.error(error);
        }
      });

    this.setCurrency(localStorage.getItem('app-currency') as CurrencyEnum);
  }

  setCurrency(currency?: CurrencyEnum) {
    if (!currency) return;
    this.currency.set(currency);
  }
}
