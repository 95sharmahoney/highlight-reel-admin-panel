import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetail: any;

  constructor(private toastr: ToastrService,
    private router: Router,
    private threeDService: ThreeDServiceService,
    public authService: AuthService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId")
    this.getUserDetails(userId);
  }

  getUserDetails(userId: any) {
    this.threeDService.show();
    this.userDetail = [];
    this.authService.getUser(userId).subscribe(res => {
      this.threeDService.hide();
      if (res.response == 200 && res.status == 'SUCCESS') {
        this.userDetail = res.data;
      } else {
        this.toastr.error(res.message);
        this.router.navigate(['admin/user-management']);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
      this.router.navigate(['admin/user-management']);
    })
  }
}
