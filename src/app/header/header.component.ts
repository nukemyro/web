import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, MatToolbarModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  filterValues: any[] = [];

  constructor() {
    this.getFilterValues();
  }

  onFilterChanged(event: any) {

  }

  private getFilterValues(): void {
    this.filterValues.push({
      value: 'none',
      viewValue: 'Home'
    });
    const unique = ['Graphic 1', 'Graphic 2'];
    unique.forEach(value => {
      this.filterValues.push({
        value,
        viewValue: value
      });
    });
  }
}
