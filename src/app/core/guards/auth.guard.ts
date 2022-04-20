import { Injectable } from '@angular/core';
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
export class AuthGuard
  implements CanLoad, CanActivate, CanActivateChild, CanDeactivate<any> {
  constructor(private auth: AuthService, private router: Router) {}

  async canLoad(): Promise<boolean> {
    return (await this.checkSession(true)) as boolean;
  }

  async canActivate(): Promise<boolean | UrlTree> {
    return await this.checkSession();
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    return await this.checkSession();
  }

  async canDeactivate(): Promise<boolean | UrlTree> {
    return await this.checkSession();
  }

  async checkSession(navigate = false) {
    await this.auth.ready.toPromise();
    const { expiredAt } = this.auth.session || {};
    const valid = expiredAt && +expiredAt >= +new Date();
    if (!valid) {
      if (navigate) return await this.router.navigateByUrl('/home');
      return this.router.createUrlTree(['/home']);
    }
    return valid;
  }
}
