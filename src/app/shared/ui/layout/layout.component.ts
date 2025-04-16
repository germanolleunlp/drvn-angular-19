import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyComponent } from '@/app/shared/ui/currency/currency.component';
import { SidebarComponent } from '@/app/shared/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CurrencyComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
