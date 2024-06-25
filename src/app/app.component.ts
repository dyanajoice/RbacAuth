

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
isLoggedIn() {
throw new Error('Method not implemented.');
}
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initialize any global setup or state here
    // Example: Subscribe to authentication state changes
    this.authService.currentUser$.subscribe(user => {
      // Handle user authentication changes
      console.log('Current user:', user);
    });
  }
}

