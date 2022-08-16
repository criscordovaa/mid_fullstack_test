import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  attempt(event: Event): void{
    if (this.form.invalid) return;
    const {email, password} = this.form.value
    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
    event.preventDefault();
    console.log(this.form.value);
  }
}
