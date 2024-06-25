import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  fetchUsers(): Observable<User[]> {
    return from(axios.get<User[]>(this.apiUrl)).pipe(
      map(response => response.data.map(user => ({
        ...user,
        role: Math.random() > 0.5 ? 'Admin' : 'Staff',
        permissions: []
      })))
    );
  }
}
