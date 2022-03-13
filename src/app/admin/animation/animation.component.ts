import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnimation } from './../../service/route.animation';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo','firstname', 'updationDate', 'gif','status', 'view',];
  userData: any = [];
  dataSource = new MatTableDataSource(this.userData);
  displayStyle: any = "none";
  id: any;
  noOfRecors = 0;
  selection: any = 0;
  constructor(private toastr: ToastrService, private router: Router, private threeDService: ThreeDServiceService, public authService: AuthService) {
  }

  ngOnInit(): void {
    // debugger
   
    this.getAllGif();
  }
  getAllGif() {
    this.userData = [];
    this.threeDService.show();
    this.authService.getAllGif("animation").subscribe(res => {
      this.threeDService.hide();
      if (res.message == 'Data fetched successfully') {
        this.userData = res.data
        // console.log(this.userData,'juned');
        
        this.noOfRecors = res.totalCount
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }
  searchFilter($event: any) {
    console.log($event,'search');
    this.userData = [];
    this.threeDService.show();
    this.authService.SearchTransition("animation",$event).subscribe(res => {
      this.threeDService.hide();
      if (res.message == 'Data fetched successfully') {
        this.userData = res.data
        // console.log(this.userData,'juned');
        
        this.noOfRecors = res.totalCount
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }
  getPaginatorData($event: any) {
    this.selection.size = $event.pageSize;
    this.selection.page = parseInt($event.pageIndex) + 1;
    sessionStorage.setItem("selection", JSON.stringify(this.selection));
  
    this.authService.SearchPagination(this.selection.page,"animation",).subscribe(res => {
      this.threeDService.hide();
      if (res.message == 'Data fetched successfully') {
        this.userData = res.data
        // console.log(this.userData,'juned');
        
        this.noOfRecors = res.totalCount
      } else {
        this.toastr.error(res.message);
      }
    }, error => {
      this.threeDService.hide();
      this.toastr.error('Technical Issue.')
      console.log(error);
    })
  }
  


  add() {
    this.router.navigate(['admin/animation/add-animation']);
  }
  view(userId:any){
    this.router.navigate(['admin/animation/view-animation'], {queryParams:{id:userId}})
  }

  onDelete()
  {
    this.id = this.ID;
    this.threeDService.show();
    this.authService.deleteTransition(this.id).subscribe(res => {
      this.threeDService.hide();
      if (res.success == true) {
        this.toastr.success(res.message);
        this.getAllGif();
        this.closePopup();
      }
      }, error => {
        this.threeDService.hide();
      console.log(error);
      });
  }

  ID:any;
  openPopup(_id:any) {
    this.ID=_id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  changeUserStatus(e: any, id: any) {
    if (e.checked) {
      this.authService.statusTransition(id, 'active').subscribe(
        res => {
          if (res.success == true) {
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message)
          }
        },
        err => {
          console.log(err, 'errorr');
          this.toastr.error('Error Occured.')
        }
      )
    }
    else {
      this.authService.statusTransition(id, 'inActive').subscribe(
        res => {
          if (res.success == true) {
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message)
          }
        },
        err => {
          this.toastr.error('Error Occured.')
        }
      )
    }
  }

}

