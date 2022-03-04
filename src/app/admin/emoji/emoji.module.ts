import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmojiComponent } from './emoji.component';
import { AddEmojiComponent } from './add-emoji/add-emoji.component';



const routes = [
    {
        path: '',
        component: EmojiComponent,

    },
    { path: 'add-emoji', loadChildren: () => import('./add-emoji/add-emoji.module').then(m => m.AddEmojiModule) },
    { path: 'view-emoji', loadChildren: () => import('./add-emoji/add-emoji.module').then(m => m.AddEmojiModule) },
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

export class EmojiModule {
}
