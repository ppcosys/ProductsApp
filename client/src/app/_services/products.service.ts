import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/';
  
  addProduct(model: any) {
    return this.http.post(this.baseUrl + 'products', model);
  }
}
