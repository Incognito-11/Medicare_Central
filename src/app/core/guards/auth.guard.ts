import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Inject the Auth Service and Router
  constructor(private auth: AuthService, private router: Router) {}
  // Function called by Angular router to check access
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is logged in
    if (this.auth.isLoggedIn()) {
      // Allow access
      return true;
    }
    // Redirect to login page if not logged in
    this.router.navigate(['/auth/login'], {
      // Save original URL to navigate back after login
      queryParams: { returnUrl: state.url },
    });
    // Block access
    return false;
  }
}
