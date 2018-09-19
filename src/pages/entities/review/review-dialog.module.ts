import { UserProfileService } from '../user-profile';
import { BusinessService } from '../business';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewDialogPage } from './review-dialog';
import { ReviewService } from './review.provider';

@NgModule({
    declarations: [
        ReviewDialogPage
    ],
    imports: [
        IonicPageModule.forChild(ReviewDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        ReviewDialogPage
    ],
    providers: [
        ReviewService,
        UserProfileService,
        BusinessService,
    ]
})
export class ReviewDialogPageModule {
}
