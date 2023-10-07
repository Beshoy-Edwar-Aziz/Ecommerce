import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router)
  if(!localStorage.getItem('tokens')){
    _router.navigate(['/login'])    
    return false
  }
  return true;
};
