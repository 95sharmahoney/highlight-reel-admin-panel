import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordPopupComponent } from 'src/app/admin/change-password-popup/change-password-popup.component';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    adminDetail: any;

  constructor(public sidebarservice: SidebarService,private router: Router,public dialog: MatDialog) { 
    let sessionData:any =  sessionStorage.getItem("adminDetail"); 
    this.adminDetail = JSON.parse(sessionData);
  }     
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".mobile-search-icon").on("click", function () {
                $(".search-bar").addClass("full-search-bar")
            }), 
            $(".search-close").on("click", function () {
                $(".search-bar").removeClass("full-search-bar")
            })
        });

    }
    logout(){
        sessionStorage.removeItem('adminDetail');
        sessionStorage.removeItem('adminId');
        this.router.navigate(['sign-in']);
    }
    changePassword(){
       const dialogAp = this.dialog.open(ChangePasswordPopupComponent,{
           width:'40vw',
           disableClose:true,
           data:null
       });
       dialogAp.afterClosed().subscribe(result => {
       });
    }
}
