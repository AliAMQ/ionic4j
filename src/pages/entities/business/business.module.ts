import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessPage } from './business';
import { BusinessService } from './business.provider';

@NgModule({
    declarations: [
        BusinessPage
    ],
    imports: [
        IonicPageModule.forChild(BusinessPage),
        TranslateModule.forChild()
    ],
    exports: [
        BusinessPage
    ],
    providers: [BusinessService]
})
export class BusinessPageModule {
}
