import { Component, EventEmitter, Output } from '@angular/core';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Output() addUser = new EventEmitter<User>();

  user: User = {
    id: 0,
    name: '',
    email: '',
    username: '', // Add username property
    role: UserRole.Admin  // Set role to 'Admin' by default
  };

  onSubmit() {
    this.addUser.emit(this.user);
    this.user = { id: 0, name: '', email: '', username: '', role:  UserRole.Admin }; // Reset form
  }
}
