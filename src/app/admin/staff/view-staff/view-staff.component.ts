import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit {

  isError: boolean = false;
  addStaffForm: FormGroup = new FormGroup({});
  id: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  pageTitle = "Add Staff";
  userDetail: any;
  email: any;
  lastName: any;
  phoneNumber: any;
  role: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService) {
    
  }

  ngOnInit(): void {
      this.pageTitle = 'VIew Staff'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.authService.getStaffById(this.id).subscribe(res => {
        this.threeDService.hide();
        if (res.success) {
          this.userDetail = res.data.firstName;
          this.email = res.data.email;
          this.lastName = res.data.lastName;
          this.phoneNumber = res.data.phoneNumber;
          this.role = res.data.role;


        } else {
          this.toastr.error(res.message);
          this.router.navigate(['admin/staff']);
        }
      }, error => {
        this.threeDService.hide();
        this.toastr.error('Technical Issue.')
        console.log(error);
        this.router.navigate(['admin/staff']);
      })
  }

  goBack() {
    this.router.navigate(['admin/staff']);
  }


  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
