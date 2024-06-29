import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        () => {
          this.router.navigate(['/users']); // Redirect to users component or dashboard
        },
        (error) => {
          this.errorMessage = error.message || 'Invalid credentials. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Username and password are required.';
    }
  }
}
