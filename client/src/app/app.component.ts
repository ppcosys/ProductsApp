import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Products Catalog';
  products: any;
  
  ngOnInit(): void {
   this.http.get('http://localhost:5000/api/products').subscribe({
    next: response => this.products = response,
    error: error => console.log(error),
    complete: () => console.log('Request has completed')
   }) 
  }
}
