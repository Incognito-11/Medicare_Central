import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('currentUser');
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (!users.length) throw new Error('Invalid credentials');
          const user = { ...users[0], token: 'mock-token' };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(roles: UserRole[]): boolean {
    const u = this.currentUserSubject.value;
    return !!u && roles.includes(u.role);
  }
}
