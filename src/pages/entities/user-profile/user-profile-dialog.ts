import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.provider';
import { User } from '../../../models/user.model';
import { User as UserService } from '../../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-user-profile-dialog',
    templateUrl: 'user-profile-dialog.html'
})
export class UserProfileDialogPage {

    userProfile: UserProfile;
    users: User[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    sinceDp: any;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private userService: UserService,
                private userProfileService: UserProfileService) {
        this.userProfile = params.get('item');
        if (this.userProfile && this.userProfile.id) {
            this.userProfileService.find(this.userProfile.id).subscribe(data => {
                this.userProfile = data;
            });
        } else {
            this.userProfile = new UserProfile();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.userProfile.id : null],
            state: [params.get('item') ? this.userProfile.state : null, ],
            city: [params.get('item') ? this.userProfile.city : null, ],
            address: [params.get('item') ? this.userProfile.address : null, ],
            phone: [params.get('item') ? this.userProfile.phone : null, ],
            image: [params.get('item') ? this.userProfile.image : null, ],
            imageContentType: [params.get('item') ? this.userProfile.imageContentType : ''],
            since: [params.get('item') ? this.userProfile.since : null, ],
            owner: [params.get('item') ? this.userProfile.owner : 'false', ],
            imagepath: [params.get('item') ? this.userProfile.imagepath : null, ],
            user: [params.get('item') ? this.userProfile.userId : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
    }

    ionViewDidLoad() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the user-profile, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera['installed']()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.userProfile[fieldName] = data;
                this.userProfile[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: 'data:image/jpg;base64,' + data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            })
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.userProfile, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
