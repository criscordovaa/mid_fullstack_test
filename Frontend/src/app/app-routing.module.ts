import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticationGuard} from "./guards/authentication.guard";
import {RedirectIfAuthenticatedGuard} from "./guards/redirect-if-authenticate.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'welcome',
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('./modules/welcome/welcome.module').then((m) => m.WelcomeModule)
      },
      {
        path: 'login',
        canActivate: [RedirectIfAuthenticatedGuard],
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
