import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { ThreeDServiceService } from '../service/three-dservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: any;
  token: any;
  type: any;
  reqType: any;
  id: any;
  public response: any;
  status: any = 0;

  constructor(public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private threeDService: ThreeDServiceService,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.resetPasswordForm = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
    })
    this.route.queryParams.subscribe((params: any) => {
      this.token = params['token'];
      this.type = params['type'];
      this.reqType = params['request_type'];
      });
  }

  ngOnInit(): void {
    this.verifyRequest();
  }

  verifyRequest() {
    if (this.token && this.type) {
      this.threeDService.show();
      this.authService.verifyRequest(this.type, this.token, this.reqType).subscribe(res => {
        this.threeDService.hide();
        if (res.response == "200" && res.status == "SUCCESS") {
          this.id = res.data;
          this.status = 1;
        } else {
          this.status = 0;
          this.toastr.error(res.message);
        }
      }, error => {
        this.threeDService.hide();
        this.toastr.error('Technical Issue.')
        console.log(error);
      })
    } else {
      this.toastr.error("Invalid request.");
    }
  }


  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.threeDService.show();
      let reqData = {
        id: this.id,
        newPassword: this.resetPasswordForm.value.new_password,
      }
      this.authService.resetPassword(reqData, this.reqType).subscribe(res => {
        this.threeDService.hide();
        if (res.response == "200" && res.status == "SUCCESS") {
          this.toastr.success(res.message);
          this.status = 2;
        } else {
          this.status = 0;
          this.toastr.error(res.message);
        }
      }, error => {
        this.threeDService.hide();
        this.toastr.error('Technical Issue.')
        console.log(error);
      })
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  addValidation() {
    var pattern = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
    if (this.resetPasswordForm.value.new_password) {
      if (pattern.test(this.resetPasswordForm.value.new_password)) {
        if (this.resetPasswordForm.value.new_password != this.resetPasswordForm.value.confirm_password) {
          this.resetPasswordForm.controls['confirm_password'].setErrors({ notMatching: true });
        }
        else {
          this.resetPasswordForm.controls['confirm_password'].setErrors(null);
        }
      } else {
        this.resetPasswordForm.controls['new_password'].setErrors({ notMatching: true });
      }
    }
  }
}
