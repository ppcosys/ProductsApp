import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = [
    { id: 12, kod: 'P012', nazwa: 'Laptop Home', cena: 2999 }
  ]
}
