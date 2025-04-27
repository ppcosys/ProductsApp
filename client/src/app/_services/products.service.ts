import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  kod: string;
  nazwa: string;
  cena: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/products';
  
  constructor() {}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }
}
