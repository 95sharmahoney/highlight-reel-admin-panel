import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile:any;
  unSelectedFile: any;
  isDoc: boolean | undefined;
  isError: any;
  docUrl: string | undefined;
  addEmojiForm: FormGroup = new FormGroup({});
  id: any;
  userId:any;
  userDetail: any= [];
  constructor(private fb: FormBuilder, private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute,  private threeDService: ThreeDServiceService, public authService: AuthService
    ){
    this.addEmojiForm = this.fb.group({
      title: ['', Validators.required],
      files: [''],
    })
   }

  ngOnInit(): void {
   
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.authService.getTransitionById(this.id).subscribe(
      res => {
         this.userDetail = res.data
        // this.addEmojiForm.patchValue({
        //   title: this.userDetail.title,
        //   files: this.userDetail.path,
        // })
      }
    )
  }


  public get f() {
    return this.addEmojiForm.controls;
  }

  addPhoto(){
    if (this.addEmojiForm.invalid) {
      this.isError = true;
    } else {
      this.threeDService.show();
      this.authService.addPhoto(this.addEmojiForm.value).subscribe(
        res => {
          console.log(res);
          if (res.success == true) {
            this.toastr.success(res.message);
            this.threeDService.hide();
            this.router.navigate(['/admin/photo']);
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

  update(){}

  onSelectDoc(e:any) {
    var file = e.target.files[0]
    if (file.size > 5242880) {
      this.docFile.nativeElement.files = this.unSelectedFile;
    } else {
      this.docUrl = ''
      this.addEmojiForm.patchValue({
        files: file
      });
      this.isDoc = true;

    }
    console.log("selected Doc", this.addEmojiForm.value);
  }

  goBack() {
    this.router.navigate(['admin/photo']);
  }

}
