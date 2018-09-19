import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessDetailPage } from './business-detail';
import { BusinessService } from './business.provider';

@NgModule({
    declarations: [
        BusinessDetailPage
    ],
    imports: [
        IonicPageModule.forChild(BusinessDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        BusinessDetailPage
    ],
    providers: [BusinessService]
})
export class BusinessDetailPageModule {
}
