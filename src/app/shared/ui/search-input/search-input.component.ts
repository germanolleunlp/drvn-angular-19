import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QueryParamsService } from '@/app/core/services/query-params.service';

@Component({
  selector: 'app-search-input',
  imports: [],
  template: `
    <label>Search: <input type="search" [value]="input()" (input)="onInput($event)" placeholder="Search..." /></label>
  `,
  styleUrl: './search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit {
  private readonly queryParamsService = inject(QueryParamsService);
  private readonly params = this.queryParamsService.params();

  protected readonly input = signal('');
  private readonly debounced = signal('');

  constructor() {
    toObservable(this.input)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((q) => {
        if (this.debounced() === q) return;
        this.debounced.set(q);
        this.queryParamsService.updateQueryParams({ q, page: 1 });
      });
  }

  ngOnInit(): void {
    const { q = '' } = this.params;
    this.input.set(q);
    this.debounced.set(q);
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.input.set(input.value?.trim());
  }
}
