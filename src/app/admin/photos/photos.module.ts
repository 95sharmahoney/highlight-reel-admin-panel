import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotosComponent } from './photos.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';



const routes = [
    {
        path: '',
        component: PhotosComponent,

    },
    { path: 'add-photo', loadChildren: () => import('./add-photo/add-photo.module').then(m => m.AddPhotoModule) },
    { path: 'view-photo', loadChildren: () => import('./add-photo/add-photo.module').then(m => m.AddPhotoModule) },
];

@NgModule({
    declarations: [
        // PhotosComponent,
    
  
    
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

       
    ]
})

export class PhotosModule {
}
