import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        resolve(true); // ✅ Usuario logueado
      } else {
        router.navigate(['login']);
        console.log('[GUARD] Usuario no logueado');
        resolve(false);
      }
    });
  });
};
