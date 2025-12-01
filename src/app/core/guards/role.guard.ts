import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  // Inject services needed for checking and redirecting
  constructor(private auth: AuthService, private router: Router) {}
  // Function that determines if the route cna be opened
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // 1. Get the list of roles required for this route from its data
    const roles = route.data['roles'] as UserRole[];
    // 2. If no roles are set on the route,allow access
    if (!roles || !roles.length) return true;
    // 3. Check if the current user has any of the required roles
    if (this.auth.hasRole(roles)) {
      // If yes, allow access
      return true;
    }
    // 4. If the user doesn't have the role, redirect them to the dashboard
    this.router.navigate(['/dashboard'], {
      // Add a flag to show an "unauthorized" message if needed
      queryParams: { unauthorized: true },
    });

    // Block access to the requested page
    return false;
  }
}
