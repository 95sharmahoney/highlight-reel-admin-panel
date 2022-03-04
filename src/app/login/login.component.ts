import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../service/auth.service';
import { ThreeDServiceService } from '../service/three-dservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  res: any;
  isError: boolean = false;
  declare loginForm: FormGroup;
  constructor(private router: Router, public fb: FormBuilder, private toastr: ToastrService, public authService: AuthService,
    private route: ActivatedRoute, private ThreeDService: ThreeDServiceService, public dialog: MatDialog) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      userEmailPhone: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  login() {
    // this.router.navigate(['admin']);

    if (this.loginForm.valid && this.loginForm.value.password !== '') {
      this.ThreeDService.show();
      this.authService.login(this.loginForm.value).subscribe(res => {
        this.ThreeDService.hide();
        if (res.success == true) {
          sessionStorage.setItem('authToken', res.token)
          sessionStorage.setItem("adminDetail", JSON.stringify(res.data));
          sessionStorage.setItem("adminId", res.data.adminId);
          this.toastr.success(res.message);
          this.router.navigate(['admin']);
        } else {
          this.toastr.error(res.message);
        }
      }, error => {
        this.ThreeDService.hide();
        if (error.status == 400) {
          this.toastr.error('Invalid username or password');
        } else {
          this.toastr.error("Please Check Your Internet Connection")
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  // login() {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value).subscribe(
  //       res => {
  //         if (res.success == true) {
           
  //             localStorage.setItem('authToken', res.token)
  //             this.router.navigate(['/admin/dashboard'])
  //             this.toastr.success(res.message);
  //          console.log(res ,"success");
           
  //         }
  //         else {
  //           this.toastr.error(res.message);
  //         }
  //       },
  //       err => {
  //         this.toastr.error('Some Error Occured.')
  //         console.log(JSON.stringify(err));
  //       }
  //     )
  //   }
  //   else {
  //     this.isError = true;
  //   }
  // }


}
