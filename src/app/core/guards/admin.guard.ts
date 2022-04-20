import { AuthGuard } from './auth.guard';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard
  implements CanLoad, CanActivate, CanActivateChild, CanDeactivate<any> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    protected injector: Injector
  ) {}

  async canLoad(): Promise<boolean> {
    return (await this.checkAdmin(true)) as boolean;
  }

  async canActivate(): Promise<boolean | UrlTree> {
    return await this.checkAdmin();
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    return await this.checkAdmin();
  }

  async canDeactivate(): Promise<boolean | UrlTree> {
    return await this.checkAdmin();
  }

  async checkAdmin(navigate = false): Promise<boolean | UrlTree> {
    const authGuard = this.injector.get(AuthGuard);
    const validSession = await authGuard.checkSession(navigate);
    if (!validSession) return validSession;
    const { user } = this.authService.session || {};
    const isAdmin = user && user.hasRoles('ADMIN');
    if (!isAdmin) {
      const duration = 2000;
      this.snackbar.open('Insuficient role', null, { duration });
      if (navigate) return await this.router.navigateByUrl('/profile');
      return this.router.createUrlTree(['/profile']);
    }
    return isAdmin;
  }
}
