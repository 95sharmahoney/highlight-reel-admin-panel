import { Component, OnInit, ViewChild,Input,OnChanges, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnimation } from './../../service/route.animation';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { ThreeDServiceService } from 'src/app/service/three-dservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'updationDate','firstname', 'gif', 'view','action'];
  userData: any = [];
  dataSource = new MatTableDataSource(this.userData);
  displayStyle: any = "none";
  id: any;
  noOfRecors = 0;
  selection: any = 0;
   showPlayer: boolean = false; 
  @Input() fileToPlay:string | undefined;

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

  getAllGif() {
    this.userData = [];
    this.threeDService.show();
    this.authService.getAllGif("sounds").subscribe(res => {
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
  updateFilter() {
    this.selection.page = 0;
    this.paginator.firstPage();
    this.getAllGif();
  }


  add() {
    this.router.navigate(['admin/sounds/add-sounds']);
  }
  view(userId:any){
    this.router.navigate(['admin/sounds/view-sounds'], {queryParams:{id:userId}})
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

}


