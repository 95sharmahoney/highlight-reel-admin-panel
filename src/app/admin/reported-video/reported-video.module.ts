import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportedVideoComponent } from './reported-video.component';

const routes = [
    {
        path: '',
        component: ReportedVideoComponent,

    },
   
];

@NgModule({
    declarations: [
    
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
    ]
})

export class ReportedModule {
}
