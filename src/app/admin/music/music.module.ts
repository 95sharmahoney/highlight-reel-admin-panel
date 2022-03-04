import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicComponent } from './music.component';
import { AddMusicComponent } from './add-music/add-music.component';



const routes = [
    {
        path: '',
        component: MusicComponent,

    },
    { path: 'add-music', loadChildren: () => import('./add-music/add-music.module').then(m => m.AddMusicModule) },
    { path: 'view-music', loadChildren: () => import('./add-music/add-music.module').then(m => m.AddMusicModule) },
];

@NgModule({
    declarations: [
        // MusicComponent,
    
  
    
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

       
    ]
})

export class MusicModule {
}
