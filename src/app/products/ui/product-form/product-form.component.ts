import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductForm } from '@/app/core/models/product-form.model';
import { Product } from '@/app/core/models/product.model';
import { RouterLink } from '@angular/router';
import { ProductService } from '@/app/core/services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly productService = inject(ProductService);

  protected readonly form: FormGroup<ProductForm> = this.fb.group({
    title: this.fb.control('', { validators: [Validators.required] }),
    price: this.fb.control(0, { validators: [Validators.required] }),
    stock: this.fb.control(0, { validators: [Validators.required] }),
    description: this.fb.control('', { validators: [Validators.required] }),
  });

  product = input.required<Product>();

  ngOnInit(): void {
    this.form.patchValue(this.product());
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product: Product = { ...this.product(), ...this.form.value };
      this.productService.updateProduct(product).subscribe({
        next: () => {
          alert('Product updated successfully');
        },
        error: () => {
          alert('Error updating product');
        },
      });
    }
  }
}
