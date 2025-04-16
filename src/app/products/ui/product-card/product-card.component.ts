import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
import { NgOptimizedImage } from '@angular/common';
import { StockPipe } from '@/app/pipes/stock.pipe';
import { CurrencyPipe } from '@/app/pipes/currency.pipe';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, StockPipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
}
