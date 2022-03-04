import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTING } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog'
import { ChangePasswordPopupComponent } from './change-password-popup/change-password-popup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { StaffComponent } from './staff/staff.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { GifComponent } from './gif/gif.component';
import { EmojiComponent } from './emoji/emoji.component';
import { AnimationComponent } from './animation/animation.component';
import { SoundComponent } from './sound/sound.component';
import { PhotosComponent } from './photos/photos.component';
import { MusicComponent } from './music/music.component'
import { AddGifComponent } from './gif/add-gif/add-gif.component';
import { AddEmojiComponent } from './emoji/add-emoji/add-emoji.component';
import { AddAnimationComponent } from './animation/add-animation/add-animation.component';
import { AddSoundComponent } from './sound/add-sound/add-sound.component';
import { AddMusicComponent } from './music/add-music/add-music.component';
import { AddPhotoComponent } from './photos/add-photo/add-photo.component';
import { ReportedVideoComponent } from './reported-video/reported-video.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTING),
    FormsModule,
    ReactiveFormsModule,
    SharedModule, 
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule
  ],
  declarations: [
    ContentLayoutComponent,
    DashboardComponent,
    UserManagementComponent,
    ChangePasswordPopupComponent,
    UserDetailsComponent,
    StaffComponent,
    AddStaffComponent,
    GifComponent,
    AddGifComponent,
    EmojiComponent,
    AddEmojiComponent,
    AnimationComponent,
    AddAnimationComponent,
    SoundComponent,
    AddSoundComponent,
    PhotosComponent,
    AddPhotoComponent,
    MusicComponent,
    AddMusicComponent,
    ReportedVideoComponent,

  ],
 
})
export class AdminModule { }
