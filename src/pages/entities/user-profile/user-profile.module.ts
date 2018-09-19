import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile';
import { UserProfileService } from './user-profile.provider';

@NgModule({
    declarations: [
        UserProfilePage
    ],
    imports: [
        IonicPageModule.forChild(UserProfilePage),
        TranslateModule.forChild()
    ],
    exports: [
        UserProfilePage
    ],
    providers: [UserProfileService]
})
export class UserProfilePageModule {
}
