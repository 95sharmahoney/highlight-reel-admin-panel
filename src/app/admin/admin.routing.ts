import { Routes } from "@angular/router";
// import { AuthGuard } from "../service/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { StaffComponent } from "./staff/staff.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserManagementComponent } from "./user-management/user-management.component";

export const ADMIN_ROUTING: Routes=[

    {path:'', redirectTo:'dashboard',pathMatch:'full'},
    // {path:'',loadChildren: ()=> import('./../shared/routes/full-layout.routes').then(m=>m.Full_ROUTES),canActivate:[AuthGuard]},
    {path:'dashboard',component:DashboardComponent},
    {path:'user-management',component:UserManagementComponent},
    {path:'staff',loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)},
    {path:'gif',loadChildren: () => import('./gif/gif.module').then(m => m.gifModule)},
    {path:'animation',loadChildren: () => import('./animation/animation.module').then(m => m.AnimationModule)},
    {path:'gif',loadChildren: () => import('./gif/gif.module').then(m => m.gifModule)},
    {path:'emoji',loadChildren: () => import('./emoji/emoji.module').then(m => m.EmojiModule)},
    {path:'music',loadChildren: () => import('./music/music.module').then(m => m.MusicModule)},
    {path:'photo',loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)},
    {path:'sounds',loadChildren: () => import('./sound/sound.module').then(m => m.SoundModule)},
    {path:'report-video',loadChildren: () => import('./reported-video/reported-video.module').then(m => m.ReportedModule)},
    {path:'user-profile',component:UserDetailsComponent}
]