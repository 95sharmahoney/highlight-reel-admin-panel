import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSoundComponent } from './add-sound.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const routes = [
    {
        path: '',
        component: AddSoundComponent
    },
];

@NgModule({
    declarations: [
        // AddSoundComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
    ]
        
})

export class AddSoundModule {
}
