import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewDetailPage } from './review-detail';
import { ReviewService } from './review.provider';

@NgModule({
    declarations: [
        ReviewDetailPage
    ],
    imports: [
        IonicPageModule.forChild(ReviewDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        ReviewDetailPage
    ],
    providers: [ReviewService]
})
export class ReviewDetailPageModule {
}
