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
  selector: 'app-reported-video',
  templateUrl: './reported-video.component.html',
  styleUrls: ['./reported-video.component.scss']
})
export class ReportedVideoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'updationDate', 'Reported', 'posted', 'ReportedBy','view', 'action'];
  userData: any = [];
  dataSource = new MatTableDataSource(this.userData);
  displayStyle: any = "none";

  noOfRecors = 0;
  selection: any = 0;
  id: any;
  data:any;
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
    this.authService.getAllReport(this.selection).subscribe(res => {
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

 

  onDelete()
  {
    this.id = this.ID;
    this.data = this.videoID;
    this.threeDService.show();
    this.authService.deleteReport(this.id,this.data).subscribe(res => {
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
  videoID:any;
  openPopup(_id:any,vId:any) {
    // this.router.navigate(['admin/user-management'], {queryParams:{id:_id}})
    this.ID=_id;
    this.videoID=vId;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  view(userId:any){
    this.router.navigate(['admin/reported/reported-video'], {queryParams:{id:userId}})
  }
  
}
