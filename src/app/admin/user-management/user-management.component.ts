import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnimation } from './../../service/route.animation';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})

export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'firstname', 'lastname', 'email', 'phoneNumber','videosCount',  'status', 'action'];
  userData: any = [];
  dataSource = new MatTableDataSource(this.userData);
  displayStyle: any = "none";

  noOfRecors = 0;
  selection: any = 0;
  id: any;
  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private threeDService: ThreeDServiceService, public authService: AuthService) {
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
    this.getAllUsers();
  }
  getAllUsers() {
    this.userData = [];
    this.threeDService.show();
    this.authService.getAllUsers(this.selection).subscribe(res => {
      this.threeDService.hide();
      if (res.message == 'Data fetched successfully') {
        this.userData = res.data
        console.log(this.userData,'juned');
        
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
    this.getAllUsers();
  }
  updateFilter() {
    this.selection.page = 0;
    this.paginator.firstPage();
    this.getAllUsers();
  }

  changeUserStatus(e:any,id:any){
    if(e.checked){
      this.authService.changeUserStatus(id,'active').subscribe(
        res =>{
          if(res.message == 'User status updated successfully'){
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message)
          }
        },
        err =>{
          console.log(err,'errorr');
          this.toastr.error('Error Occured.')
        }
      )
    }
    else {
      this.authService.changeUserStatus(id,'inActive').subscribe(
        res =>{
          if(res.message == 'User status updated successfully'){
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message)
          }
        },
        err =>{
          this.toastr.error('Error Occured.')
        }
      )
    }
  }

  onDelete()
  {
    this.id = this.ID;

    this.threeDService.show();
    this.authService.deleteUser(this.id).subscribe(res => {
      this.threeDService.hide();
      if (res.success == true) {
        this.toastr.success(res.message);
        // window.location.reload();
        this.getAllUsers();
        this.closePopup();
      }
      }, error => {
        this.threeDService.hide();
      console.log(error);
      });

  }

  ID:any;

  openPopup(_id:any) {
    // this.router.navigate(['admin/user-management'], {queryParams:{id:_id}})
    this.ID=_id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
  
}
