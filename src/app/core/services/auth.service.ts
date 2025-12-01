import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //Base URL for the JSON Server mock API
  private baseurl = 'http://localhost:3000';
  //BehaviourSubject holds the current user data and emits changes
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  // Public Observable for components to subscribe to user state changes
  currentUser$ = this.currentUserSubject.asObservable();

  // Inject the Angular HttpClient
  constructor(private http: HttpClient) {
    // Check local storage for a previously logged-in user on app start
    const stored = localStorage.getItem('currentUser');
    // If a user is found, push it into the BehaviourSubject
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }
  // Handle the login process
  login(email: string, password: string): Observable<User> {
    //Make a GET request to the JSON Server 'users' endpoint to simulate authentication
    return this.http
      .get<User[]>(`${this.baseurl}/users?email=${email}&password=${password}`)
      .pipe(
        //Use the RxJs map operator to process the API response
        map((users) => {
          // Checks if any user was found
          if (!users.length) throw new Error('Invalid Credentials');
          // Use the first user found and add a mock token
          const user = { ...users[0], token: 'mock-token' };
          // Save user data to local storage for persistence
          localStorage.setItem('currentUser', JSON.stringify(user));
          // Emit the new user to all subscribers
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  // Handles the logout process
  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('currentUser');
    // Set the user state back to null
    this.currentUserSubject.next(null);
  }
  // Getter for retrieving the current user's object synchronously
  get currentUser():User | null{
    return this.currentUserSubject.value;
  }
  // Checks if a user is currently logged in 
  isLoggedIn():boolean{
    return !!this.currentUserSubject.value;
  }

  //Checks if the current user has any of the required roles
  hasRole(roles:UserRole[]):boolean{
    const u= this.currentUserSubject.value;
    // Returns true if user exists AND their role is in the required roles array
    return !!u && roles.includes(u.role);
  }
}
