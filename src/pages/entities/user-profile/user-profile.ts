import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfilePage {
    userProfiles: UserProfile[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private userProfileService: UserProfileService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.userProfiles = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.userProfileService.query().subscribe(
            (response) => {
                this.userProfiles = response;
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

    trackId(index: number, item: UserProfile) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: UserProfile) {
        let modal = this.modalCtrl.create('UserProfileDialogPage', {item: item});
        modal.onDidDismiss(userProfile => {
            if (userProfile) {
                if (userProfile.id) {
                    this.userProfileService.update(userProfile).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'UserProfile updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.userProfileService.create(userProfile).subscribe(data => {
                        this.userProfiles.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'UserProfile added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(userProfile) {
        this.userProfileService.delete(userProfile.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'UserProfile deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(userProfile: UserProfile) {
        this.navCtrl.push('UserProfileDetailPage', {id: userProfile.id});
    }
}
