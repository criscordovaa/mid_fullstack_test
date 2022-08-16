import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {IUser} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userName: BehaviorSubject<string>

  constructor(
    private authService: AuthService
  ) {
    this.userName = new BehaviorSubject<string>('');
  }

  ngOnInit(): void {
    this.authService.$user.subscribe({
      next: (res) => {
        if(res) {
          this.userName.next(res.name)
        }
      }
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
