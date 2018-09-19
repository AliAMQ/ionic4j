import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileDetailPage } from './user-profile-detail';
import { UserProfileService } from './user-profile.provider';

@NgModule({
    declarations: [
        UserProfileDetailPage
    ],
    imports: [
        IonicPageModule.forChild(UserProfileDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        UserProfileDetailPage
    ],
    providers: [UserProfileService]
})
export class UserProfileDetailPageModule {
}
