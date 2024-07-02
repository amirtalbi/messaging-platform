import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { USER_MUTATION } from './user-mutation';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private apollo: Apollo) {}

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  createOrLogUser(username: string, password: string): Observable<any> {
    try {
      return this.apollo
        .mutate({
          mutation: USER_MUTATION,
          variables: {
            username,
            password,
          },
        })
        .pipe(map((result: any) => result.data.user));
    } catch (err) {
      console.error('Error during authentication:', err);
      return null;
    }
  }
}
