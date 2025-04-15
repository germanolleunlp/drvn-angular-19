import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-table',
  imports: [],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {}
