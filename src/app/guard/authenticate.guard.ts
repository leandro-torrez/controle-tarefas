import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  if (!loginService.getToken()) {
    loginService.logout();
    return false;
  }
  return true;
};
