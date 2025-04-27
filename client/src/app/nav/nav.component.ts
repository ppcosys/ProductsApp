import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Output() viewChanged = new EventEmitter<string>();

  onSelectView(view: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.viewChanged.emit(view);
  }
}
