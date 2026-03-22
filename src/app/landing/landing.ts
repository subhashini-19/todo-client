import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
})
export class LandingComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    // Authenticate the user first
    this.authService.login('user@azure.com', 'password');
    // Then navigate to todo
    this.router.navigate(['todo']);
  }
}
