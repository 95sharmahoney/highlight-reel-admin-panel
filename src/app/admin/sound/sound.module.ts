import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoundComponent } from './sound.component';
import { AddSoundComponent } from './add-sound/add-sound.component';



const routes = [
    {
        path: '',
        component: SoundComponent,

    },
    { path: 'add-sounds', loadChildren: () => import('./add-sound/add-sound.module').then(m => m.AddSoundModule) },
    { path: 'view-sounds', loadChildren: () => import('./add-sound/add-sound.module').then(m => m.AddSoundModule) },
];

@NgModule({
    declarations: [
        // SoundComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

       
    ]
})

export class SoundModule {
}
