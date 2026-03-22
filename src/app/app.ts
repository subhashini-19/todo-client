import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LandingComponent } from './landing/landing';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingComponent, Todo],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Auth service is initialized in constructor
  }

  logout() {
    this.authService.logout();
  }

  isUnauthorizedRoute(): boolean {
    return this.router.url.includes('unauthorized');
  }
}