import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { ThreeDServiceService } from '../service/three-dservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  constructor(public fb: FormBuilder,
    public router: Router,
    private threeDService: ThreeDServiceService,
    private authService: AuthService,
    // public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    })
  }
 
  forgot() {
    if (this.forgotPasswordForm.valid) {
      this.threeDService.show();
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(res => {
        this.threeDService.hide();
        if (res.response == 200 && res.status == 'SUCCESS') {
           this.toastr.success(res.message);
          // this.dialogRef.close();
        } else {
          this.toastr.error(res.message)
        }
      }, error => {
        this.threeDService.hide();
        this.toastr.error('Technical Issue.')
        console.log(error);
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
