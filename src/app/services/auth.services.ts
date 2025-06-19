import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  login(token: string, expiresInSeconds: number = 3600): void {
    if (this.isBrowser) {
      const expiry = new Date().getTime() + expiresInSeconds * 1000;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('jwt_expiry', expiry.toString());
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('jwt_expiry');
    }
  }

  get loggedIn(): boolean {
    if (!this.isBrowser) return false;

    const token = localStorage.getItem('jwt_token');
    const expiry = localStorage.getItem('jwt_expiry');

    if (!token || !expiry) return false;

    const now = new Date().getTime();
    if (now > parseInt(expiry)) {
      this.logout(); // Token expired
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('jwt_token') : null;
  }
}
