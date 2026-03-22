import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = signal(false);

  constructor(private authService: AuthService) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);

      if (success) {
        this.email = '';
        this.password = '';
      } else {
        this.errorMessage = 'Invalid email format. Please use a valid email address.';
      }

      this.isLoading.set(false);
    }, 500);
  }
}
