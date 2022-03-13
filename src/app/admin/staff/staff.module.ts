import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';



const routes = [
    {
        path: '',
        component: StaffComponent,

    },
    { path: 'add-staff', loadChildren: () => import('./add-staff/add-staff.module').then(m => m.AddStaffModule) },
    { path: 'edit-staff', loadChildren: () => import('./add-staff/add-staff.module').then(m => m.AddStaffModule) },
    { path: 'view-staff', loadChildren: () => import('./view-staff/view-staff.module').then(m => m.ViewStaffModule) },

];

@NgModule({
    declarations: [
        // StaffComponent,
    
    // ViewStaffComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

       
    ]
})

export class StaffModule {
}
