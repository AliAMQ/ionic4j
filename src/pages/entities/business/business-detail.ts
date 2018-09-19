import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Business } from './business.model';
import { BusinessService } from './business.provider';

@IonicPage({
    segment: 'business-detail/:id',
    defaultHistory: ['EntityPage', 'businessPage']
})
@Component({
    selector: 'page-business-detail',
    templateUrl: 'business-detail.html'
})
export class BusinessDetailPage {
    business: Business;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private businessService: BusinessService, private toastCtrl: ToastController) {
        this.business = new Business();
        this.business.id = params.get('id');
    }

    ionViewDidLoad() {
        this.businessService.find(this.business.id).subscribe(data => this.business = data);
    }

    open(item: Business) {
        let modal = this.modalCtrl.create('BusinessDialogPage', {item: item});
        modal.onDidDismiss(business => {
            if (business) {
                this.businessService.update(business).subscribe(data => {
                    this.business = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Business updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
