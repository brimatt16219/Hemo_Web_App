import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // makes it global without needing to add it to providers array
})
export class GlobalService {
  private _username: string = '';

  getUsername(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username') || 'User';
    } else {
      return 'User'; // Fallback if not in browser
    }
  }

  setUsername(username: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', username);
    }
  }

  clear(): void {
    this._username = '';
    localStorage.removeItem('username');
  }
}
