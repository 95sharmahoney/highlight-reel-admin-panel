import { Component, OnInit, ViewChild,Input,OnChanges, SimpleChange } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-sound',
  templateUrl: './add-sound.component.html',
  styleUrls: ['./add-sound.component.scss']
})
export class AddSoundComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile:any;
  unSelectedFile: any;
  isDoc: boolean | undefined;
  isError: any;
  docUrl: string | undefined;
  addGifForm: FormGroup = new FormGroup({});
  id: any;
  values:any =[];
  showPlayer: boolean = false; 
  @Input() fileToPlay:string | undefined ;
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
         this.values = res.data
         console.log(this.values,'------');
         
        // this.addEmojiForm.patchValue({
        //   title: this.userDetail.title,
        //   files: this.userDetail.path,
        // })
      }
    )
     if (this.fileToPlay != '') {
      this.showPlayer = true;
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){

    if(changes['fileToPlay'].previousValue !== changes['fileToPlay'].currentValue && changes['fileToPlay'].currentValue !== '') {
     this.showPlayer = false;
     setTimeout(() => this.showPlayer = true, 0);
   }
 }

  public get f() {
    return this.addGifForm.controls;
  }

  add(){
    if (this.addGifForm.invalid) {
      this.isError = true;
    } else {
      this.threeDService.show();
      this.authService.addSounds(this.addGifForm.value).subscribe(
        res => {
          console.log(res);
          if (res.success == true) {
            this.toastr.success(res.message);
            this.threeDService.hide();
            this.router.navigate(['/admin/sounds']);
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



  onSelectDoc(e:any) {
    var file = e.target.files[0]
    // if (file.size > 5242880) {
    //   this.docFile.nativeElement.files = this.unSelectedFile;
    // }
    //  else {
      this.docUrl = ''
      this.addGifForm.patchValue({
        files: file
      });
      this.isDoc = true;

    // }
    console.log("selected Doc", this.addGifForm.value);
  }

  goBack() {
    this.router.navigate(['admin/sounds']);
  }

}
