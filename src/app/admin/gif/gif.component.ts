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
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss']
})
export class GifComponent implements OnInit {

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
    this.selection = { "page": 0, "size": 10, search: '' };
    let selection: any = sessionStorage.getItem("selection");
    selection = JSON.parse(selection);
    if (selection) {
      this.selection.page = selection.page;
      this.selection.size = selection.size;
      this.selection.search = selection.search;
      this.paginator.pageIndex = selection.page;
      this.paginator.pageSize = selection.size;
      sessionStorage.removeItem("selection");
    }
    this.getAllGif();
  }
  getAllGif() {
    this.userData = [];
    this.threeDService.show();
    this.authService.getAllGif("GIF").subscribe(res => {
      this.threeDService.hide();
      if (res.message == 'Data fetched successfully') {
        this.userData = res.data
        // console.log(this.userData,'juned');
        
        this.noOfRecors = res.totalUser
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
    this.authService.SearchTransition("GIF",$event).subscribe(res => {
      this.threeDService.hide();
      if (res.message == 'Data fetched successfully') {
        this.userData = res.data
        // console.log(this.userData,'juned');
        
        this.noOfRecors = res.totalUser
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
    this.selection.page = $event.pageIndex;
    sessionStorage.setItem("selection", JSON.stringify(this.selection));
    this.getAllGif();
  }
 

  addGif() {
    this.router.navigate(['admin/gif/add-gif']);
  }
  view(userId:any){
    this.router.navigate(['admin/gif/view-gif'], {queryParams:{id:userId}})
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

  ID:any;
  openPopup(_id:any) {
    this.ID=_id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
