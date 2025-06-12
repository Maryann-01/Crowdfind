// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isBrowser: boolean;

//   constructor() {
//     this.isBrowser = typeof window !== 'undefined';
//   }

//   login(token: string): void {
//     if (this.isBrowser) {
//       localStorage.setItem('jwt_token', token);
//     }
//   }

//   logout(): void {
//     if (this.isBrowser) {
//       localStorage.removeItem('jwt_token');
//     }
//   }

//   get loggedIn(): boolean {
//     return this.isBrowser && !!localStorage.getItem('jwt_token');
//   }

//   getToken(): string | null {
//     return this.isBrowser ? localStorage.getItem('jwt_token') : null;
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  login(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('jwt_token', token);
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('jwt_token');
    }
  }

  get loggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem('jwt_token');
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('jwt_token') : null;
  }
}

