import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  isError: boolean = false;
  addStaffForm: FormGroup = new FormGroup({});
  id: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  pageTitle = "Add Staff";

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService) {
    this.addStaffForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      phone_number: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.queryParamMap.get('id');
    // this.authService.getStaffById(this.id).subscribe(
    //   res => {
    //     let values = res.data
    //     this.addStaffForm.patchValue({
    //       userId: values.userId,
    //       first_name: values.firstName,
    //       last_name: values.lastName,
    //       phone_number: values.phoneNumber,
    //       email: values.email,
    //     })
    //   }
    // )

    if (this.router.url.includes('add-staff')) {
      this.pageTitle = 'Add Staff'
    }
    else if (this.router.url.includes('view-staff')) {
      this.pageTitle = 'View Staff'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.authService.getStaffById(this.id).subscribe(
        res => {
          console.log(res);
        let values = res.data
          
          if (res.message == 'Data fetched successfully') {
            this.toastr.success(res.message);
            this.addStaffForm.patchValue({
              userId: values.userId,
              first_name: values.firstName,
              last_name: values.lastName,
              phone_number: values.phoneNumber,
              email: values.email,
            })
           
          } else {
            this.toastr.error(res.message);

          }
        }
      )
    }

  }

  goBack() {
    this.router.navigate(['admin/staff']);
  }
  public get f() {
    return this.addStaffForm.controls;
  }
  get officialEmail() {
    return this.addStaffForm.get('email');
  }
  addStaff() {
    let password = this.addStaffForm.value.password;
    let confirmpassword = this.addStaffForm.value.confirmpassword;
    if (password != confirmpassword) {
      this.toastr.error("Confirm password not matched")
      return;
    }
    console.log(this.addStaffForm.value);

    if (this.addStaffForm.invalid) {
      this.isError = true;
    } else {
      this.threeDService.show();
      this.authService.addStaffUser(this.addStaffForm.value).subscribe(
        res => {
          console.log(res);
          if (res.success == true) {
            this.toastr.success(res.message);
            this.threeDService.hide();
            this.router.navigate(['/admin/staff']);
          } else {
            this.threeDService.hide();
            this.toastr.error(res.message);
          }
        },
        err => {
          this.threeDService.hide();
          this.toastr.error('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  updateStaffMember() {
    console.log(this.addStaffForm.value);
      this.authService.updateStaff(this.id,this.addStaffForm.value).subscribe(
        res => {
          console.log(res);
          if(res.status == 'OK'){
            this.threeDService.hide();
            this.router.navigate(['/admin/staff']);
            this.toastr.success(res.message);
          } else {
            this.threeDService.hide();
            this.toastr.error(res.message);
          }
          
        },
        err => {
          this.threeDService.hide();
          this.toastr.error("Error Occured.");  
        }
      )
  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
