import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GifComponent } from './gif.component';
import { AddGifComponent } from './add-gif/add-gif.component';



const routes = [
    {
        path: '',
        component: GifComponent,

    },
    { path: 'add-gif', loadChildren: () => import('./add-gif/add-gif.module').then(m => m.AddGifModule) },
    { path: 'view-gif', loadChildren: () => import('./add-gif/add-gif.module').then(m => m.AddGifModule) },
];

@NgModule({
    declarations: [
        // GifComponent,
    
    // AddGifComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

       
    ]
})

export class gifModule {
}
