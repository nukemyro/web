import { Routes } from '@angular/router';
import { Graphic1Component } from './graphic1/graphic1.component';
import { Graphic2Component } from './graphic2/graphic2.component';
import { DevlogComponent } from './devlog/devlog.component';
import { LandingComponent } from './landing/landing.component';
import { SqlComponent } from './sql/sql.component';

export const routes: Routes = [
  { path: 'graphic1', component: Graphic1Component },
  { path: 'graphic2', component: Graphic2Component },
  { path: 'devlog', component: DevlogComponent },
  { path: 'home', component: LandingComponent },
  { path: 'sql', component: SqlComponent },
  { path: '**', redirectTo: '/graphic2', pathMatch: 'full' }
];
