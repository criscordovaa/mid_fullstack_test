import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {IUser} from "../models/user.model";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {map, tap} from "rxjs/operators";
import {IToken} from "../models/token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private user = new ReplaySubject<IUser | null>(1);
  $user = this.user.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
  }

  login(email: string, password: string): Observable<IUser>{
      return this.apiService.post<IToken>('/login', {email, password})
        .pipe(
          tap((response) => {
            const {token, user} = response;
            localStorage.setItem('token', token);
            this.user.next(user);
            console.log(user);
            this.router.navigate(['welcome'], {replaceUrl: true}).then();
          }),
          map((res) => res.user)
        )
  }

  logout(): void{
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['login'], {replaceUrl: true});
  }

  me(): void{
    this.apiService.get<IUser>('/me').subscribe({
      next: (res) => this.user.next(res),
      error: () => this.user.next(null)
    })
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
