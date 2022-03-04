import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimationComponent } from './animation.component';
import { AddAnimationComponent } from './add-animation/add-animation.component';



const routes = [
    {
        path: '',
        component: AnimationComponent,

    },
    { path: 'add-animation', loadChildren: () => import('./add-animation/add-animation.module').then(m => m.AddAnimationModule) },
    { path: 'view-animation', loadChildren: () => import('./add-animation/add-animation.module').then(m => m.AddAnimationModule) },
];

@NgModule({
    declarations: [
        // AnimationComponent,
    
  
    
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

       
    ]
})

export class AnimationModule {
}
