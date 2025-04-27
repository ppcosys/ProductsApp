import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductsService } from '../_services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);
  products: Product[] = [];
  isEditing: boolean = false;
  isAdding: boolean = false;
  productBeingEdited: Product | null = null;
  newProduct: Product = { id: 0, kod: '', nazwa: '', cena: 0 };

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
    this.productsService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.resetForm();
        this.isAdding = false;
      },
      error: (err) => console.error(err)
    });
  }

  onDeleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  onUpdateProduct() {
    if (this.productBeingEdited) {
      this.productsService.updateProduct(this.productBeingEdited).subscribe(() => {
        this.loadProducts();
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.productBeingEdited = null;
  }

  resetForm() {
    this.newProduct = { id: 0, kod: '', nazwa: '', cena: 0 };
  }
  
  startAdding() {
    this.isAdding = true;
    this.isEditing = false;
  }

  startEditing(product: Product) {
    this.isEditing = true;
    this.isAdding = false;
    this.productBeingEdited = { ...product };
  }

  cancelAdd() {
    this.isAdding = false;
    this.resetForm();
  }

}

