import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data['roles'] as UserRole[];
    if (!roles || !roles.length) return true;

    if (this.auth.hasRole(roles)) return true;

    this.router.navigate(['/dashboard'], {
      queryParams: { unauthorized: true },
    });
    return false;
  }
}
