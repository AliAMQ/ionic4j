import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Review } from './review.model';
import { ReviewService } from './review.provider';

@IonicPage({
    segment: 'review-detail/:id',
    defaultHistory: ['EntityPage', 'reviewPage']
})
@Component({
    selector: 'page-review-detail',
    templateUrl: 'review-detail.html'
})
export class ReviewDetailPage {
    review: Review;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private reviewService: ReviewService, private toastCtrl: ToastController) {
        this.review = new Review();
        this.review.id = params.get('id');
    }

    ionViewDidLoad() {
        this.reviewService.find(this.review.id).subscribe(data => this.review = data);
    }

    open(item: Review) {
        let modal = this.modalCtrl.create('ReviewDialogPage', {item: item});
        modal.onDidDismiss(review => {
            if (review) {
                this.reviewService.update(review).subscribe(data => {
                    this.review = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Review updated successfully.', duration: 3000, position: 'middle'});
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
