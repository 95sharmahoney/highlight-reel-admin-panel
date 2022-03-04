import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './admin/layouts/full-layout/full-layout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './service/auth.guard';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { VerifyUserAccountComponent } from './verify-user-account/verify-user-account.component';

const routes: Routes = [
  
  // { path: '**',redirectTo: 'sign-in' },
  { path:'', redirectTo:'sign-in', pathMatch:'full'}, 
  { path:'sign-in', component: LoginComponent },
  { path:'forgot-password', component: ForgotPasswordComponent },
  { path:'admin/reset-password', component: ResetPasswordComponent },
  { path:'admin/verify-user-account', component: VerifyUserAccountComponent },
  { path:'admin', component: FullLayoutComponent,
  // loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  children:Full_ROUTES,canActivate:[AuthGuard]
 },


 
]
@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
