import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user: User | null = {
    id: 0,
    name: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    },
    username: '',
    role: UserRole.Admin
  }; // Initialize with default empty User object

  @Output() addUser = new EventEmitter<User>();

  onSubmit() {
    if (this.user) {
      this.addUser.emit(this.user);
      this.user = { // Reset the form to an empty User object after submission
        id: 0,
        name: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        },
        username: '',
        role: UserRole.Admin
      };
    }
  }
}
