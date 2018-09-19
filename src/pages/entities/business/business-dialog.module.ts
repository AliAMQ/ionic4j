import { UserProfileService } from '../user-profile';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessDialogPage } from './business-dialog';
import { BusinessService } from './business.provider';

@NgModule({
    declarations: [
        BusinessDialogPage
    ],
    imports: [
        IonicPageModule.forChild(BusinessDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        BusinessDialogPage
    ],
    providers: [
        BusinessService,
        UserProfileService,
    ]
})
export class BusinessDialogPageModule {
}
