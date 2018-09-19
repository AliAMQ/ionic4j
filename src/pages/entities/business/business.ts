import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Business } from './business.model';
import { BusinessService } from './business.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-business',
    templateUrl: 'business.html'
})
export class BusinessPage {
    businesses: Business[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private businessService: BusinessService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.businesses = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.businessService.query().subscribe(
            (response) => {
                this.businesses = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Business) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Business) {
        let modal = this.modalCtrl.create('BusinessDialogPage', {item: item});
        modal.onDidDismiss(business => {
            if (business) {
                if (business.id) {
                    this.businessService.update(business).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Business updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.businessService.create(business).subscribe(data => {
                        this.businesses.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Business added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(business) {
        this.businessService.delete(business.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Business deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(business: Business) {
        this.navCtrl.push('BusinessDetailPage', {id: business.id});
    }
}
