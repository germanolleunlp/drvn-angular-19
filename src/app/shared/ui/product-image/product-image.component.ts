import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '@/app/core/models/product.model';

@Component({
  selector: 'app-product-image',
  imports: [NgOptimizedImage],
  template: `<img
    [ngSrc]="this.product().thumbnail || '/image.svg'"
    alt="{{ product().title }}"
    width="{{ sizes()[0] }}"
    height="{{ sizes()[1] }}"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageComponent {
  product = input.required<Product>();
  size = input<'big' | 'medium' | 'small'>('medium');

  protected sizes = computed(() => {
    switch (this.size()) {
      case 'big':
        return [240, 240];
      case 'medium':
        return [120, 120];
      case 'small':
        return [60, 60];
    }
  });
}
