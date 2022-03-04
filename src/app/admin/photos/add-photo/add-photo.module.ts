import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPhotoComponent } from './add-photo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const routes = [
    {
        path: '',
        component: AddPhotoComponent
    },
];

@NgModule({
    declarations: [
        // AddGifComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
    ]
        
})

export class AddPhotoModule {
}
