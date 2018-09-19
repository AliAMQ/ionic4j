import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Review } from './review.model';
import { ReviewService } from './review.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-review',
    templateUrl: 'review.html'
})
export class ReviewPage {
    reviews: Review[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private reviewService: ReviewService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.reviews = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.reviewService.query().subscribe(
            (response) => {
                this.reviews = response;
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

    trackId(index: number, item: Review) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Review) {
        let modal = this.modalCtrl.create('ReviewDialogPage', {item: item});
        modal.onDidDismiss(review => {
            if (review) {
                if (review.id) {
                    this.reviewService.update(review).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Review updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.reviewService.create(review).subscribe(data => {
                        this.reviews.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Review added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(review) {
        this.reviewService.delete(review.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Review deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(review: Review) {
        this.navCtrl.push('ReviewDetailPage', {id: review.id});
    }
}
