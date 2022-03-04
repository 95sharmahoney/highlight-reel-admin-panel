import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { ThreeDServiceService } from '../service/three-dservice.service';

@Component({
  selector: 'app-verify-user-account',
  templateUrl: './verify-user-account.component.html',
  styleUrls: ['./verify-user-account.component.scss']
})
export class VerifyUserAccountComponent implements OnInit {

  status:any=1;
  token: any;
  type: any;
  reqType: any;

  constructor(public router: Router,
    public route: ActivatedRoute,
    private threeDService: ThreeDServiceService,
    private authService: AuthService,
    private toastr: ToastrService) {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params['token'];
      this.type = params['type'];
      this.reqType = params['request_type'];
      console.log('token', this.token)
      console.log('type', this.type)
      console.log('req_type', this.reqType)
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

}
