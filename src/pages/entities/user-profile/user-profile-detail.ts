import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.provider';

@IonicPage({
    segment: 'user-profile-detail/:id',
    defaultHistory: ['EntityPage', 'user-profilePage']
})
@Component({
    selector: 'page-user-profile-detail',
    templateUrl: 'user-profile-detail.html'
})
export class UserProfileDetailPage {
    userProfile: UserProfile;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private userProfileService: UserProfileService, private toastCtrl: ToastController) {
        this.userProfile = new UserProfile();
        this.userProfile.id = params.get('id');
    }

    ionViewDidLoad() {
        this.userProfileService.find(this.userProfile.id).subscribe(data => this.userProfile = data);
    }

    open(item: UserProfile) {
        let modal = this.modalCtrl.create('UserProfileDialogPage', {item: item});
        modal.onDidDismiss(userProfile => {
            if (userProfile) {
                this.userProfileService.update(userProfile).subscribe(data => {
                    this.userProfile = data;
                    let toast = this.toastCtrl.create(
                        {message: 'UserProfile updated successfully.', duration: 3000, position: 'middle'});
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
