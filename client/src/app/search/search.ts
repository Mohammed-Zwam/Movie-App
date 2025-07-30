import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchText: string = '';
  @Output() dataEmitter = new EventEmitter<string>();

  sendData() {
    this.dataEmitter.emit(this.searchText);
  }
}
