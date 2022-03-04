import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUser: any;
  totalAdmin: any;
  constructor(private router: Router, private toastr: ToastrService, public authService: AuthService,
    private route: ActivatedRoute, private ThreeDService: ThreeDServiceService) { }

  ngOnInit(): void {
    this.dashboardCount();
    const firstTime = localStorage.getItem('key')
    if(!firstTime){
      localStorage.setItem('key','loaded')
     location.reload()
    }else {
      localStorage.removeItem('key') 
    }
  }
  dashboardCount() {
    // this.ThreeDService.show();
  //   this.authService.dashboardCount().subscribe(res => {
  //     this.ThreeDService.hide();
  //     if (res.response == 200) {
  //       this.totalUser = res.data.totalUser;
  //       this.totalAdmin = res.data.totalAdmin;
  //     } else {
  //       this.toastr.error(res.message);
  //     }
  //   }, error => {
  //      this.toastr.error('Internal Server Error');
  //   })
  }

}
