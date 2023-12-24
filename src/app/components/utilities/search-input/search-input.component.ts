// search-input-container.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent {
  searchTerm: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
