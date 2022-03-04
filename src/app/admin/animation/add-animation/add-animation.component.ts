import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-animation',
  templateUrl: './add-animation.component.html',
  styleUrls: ['./add-animation.component.scss']
})
export class AddAnimationComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile:any;
  unSelectedFile: any;
  isDoc: boolean | undefined;
  isError: any;
  docUrl: string | undefined;
  addGifForm: FormGroup = new FormGroup({});
  id: any;

  constructor(private fb: FormBuilder, private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute,  private threeDService: ThreeDServiceService, public authService: AuthService
    ){
    this.addGifForm = this.fb.group({
      title: ['', Validators.required],
      files: [''],
    })
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.authService.getTransitionById(this.id).subscribe(
      res => {
        let values = res.data
        this.addGifForm.patchValue({
          title: values.title,
          files: values.path,
        })
      }
    )
  }

  public get f() {
    return this.addGifForm.controls;
  }

  add(){
    if (this.addGifForm.invalid) {
      this.isError = true;
    } else {
      this.threeDService.show();
      this.authService.addAnimation(this.addGifForm.value).subscribe(
        res => {
          console.log(res);
          if (res.success == true) {
            this.toastr.success(res.message);
            this.threeDService.hide();
            this.router.navigate(['/admin/animation']);
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
      this.addGifForm.patchValue({
        files: file
      });
      this.isDoc = true;

    }
    console.log("selected Doc", this.addGifForm.value);
  }

  goBack() {
    this.router.navigate(['admin/animation']);
  }

}
