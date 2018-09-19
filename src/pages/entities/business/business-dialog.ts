import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Business } from './business.model';
import { BusinessService } from './business.provider';
import { UserProfile, UserProfileService } from '../user-profile';

@IonicPage()
@Component({
    selector: 'page-business-dialog',
    templateUrl: 'business-dialog.html'
})
export class BusinessDialogPage {

    business: Business;
    userprofiles: UserProfile[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    sinceDp: any;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private userProfileService: UserProfileService,
                private businessService: BusinessService) {
        this.business = params.get('item');
        if (this.business && this.business.id) {
            this.businessService.find(this.business.id).subscribe(data => {
                this.business = data;
            });
        } else {
            this.business = new Business();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.business.id : null],
            title: [params.get('item') ? this.business.title : null,  Validators.required],
            description: [params.get('item') ? this.business.description : null, ],
            state: [params.get('item') ? this.business.state : null, ],
            address: [params.get('item') ? this.business.address : null, ],
            phone: [params.get('item') ? this.business.phone : null, ],
            rate: [params.get('item') ? this.business.rate : null, ],
            since: [params.get('item') ? this.business.since : null, ],
            link: [params.get('item') ? this.business.link : null, ],
            reservation: [params.get('item') ? this.business.reservation : 'false', ],
            delivery: [params.get('item') ? this.business.delivery : 'false', ],
            wifi: [params.get('item') ? this.business.wifi : 'false', ],
            image: [params.get('item') ? this.business.image : null, ],
            imageContentType: [params.get('item') ? this.business.imageContentType : ''],
            video: [params.get('item') ? this.business.video : null, ],
            videoContentType: [params.get('item') ? this.business.videoContentType : ''],
            paid: [params.get('item') ? this.business.paid : 'false', ],
            imagepath: [params.get('item') ? this.business.imagepath : null, ],
            videopath: [params.get('item') ? this.business.videopath : null, ],
            userProfile: [params.get('item') ? this.business.userProfileId : '',],
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
        this.userProfileService.query()
            .subscribe(data => { this.userprofiles = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the business, so return it
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
                this.business[fieldName] = data;
                this.business[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.business, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUserProfile(first: UserProfile, second: UserProfile): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserProfileById(index: number, item: UserProfile) {
        return item.id;
    }
}
