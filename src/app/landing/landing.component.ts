import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [ ]
})
export class LandingComponent {
  constructor(private router: Router) {

  }

  onClick(route: any) {
    this.router.navigate(route.link);
  }
}
