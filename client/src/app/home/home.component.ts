import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (response) => this.products = response,
      error: (err) => console.error(err)
    });
  }

  onAddProduct() {
    const newProduct: Product = { id: 0, kod: 'P999', nazwa: 'Nowy Produkt', cena: 1234 };
    this.productsService.addProduct(newProduct).subscribe(() => this.loadProducts());
  }

  onDeleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  onUpdateProduct(product: Product) {
    const updatedProduct = { ...product, nazwa: 'Zmieniona Nazwa' };
    this.productsService.updateProduct(updatedProduct).subscribe(() => this.loadProducts());
  }

}

