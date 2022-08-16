import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {WelcomeComponent} from "./welcome.component";
import {WelcomeRoutingModule} from "./welcome-routing.module";

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatButtonModule
  ]
})
export class WelcomeModule {
}
