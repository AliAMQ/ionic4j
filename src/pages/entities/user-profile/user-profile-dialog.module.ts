import { User as UserService } from '../../../providers/user/user';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileDialogPage } from './user-profile-dialog';
import { UserProfileService } from './user-profile.provider';

@NgModule({
    declarations: [
        UserProfileDialogPage
    ],
    imports: [
        IonicPageModule.forChild(UserProfileDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        UserProfileDialogPage
    ],
    providers: [
        UserProfileService,
        UserService,
    ]
})
export class UserProfileDialogPageModule {
}
