import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Review } from './review.model';
import { ReviewService } from './review.provider';
import { UserProfile, UserProfileService } from '../user-profile';
import { Business, BusinessService } from '../business';

@IonicPage()
@Component({
    selector: 'page-review-dialog',
    templateUrl: 'review-dialog.html'
})
export class ReviewDialogPage {

    review: Review;
    userprofiles: UserProfile[];
    businesses: Business[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    dateDp: any;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private userProfileService: UserProfileService,
                private businessService: BusinessService,
                private reviewService: ReviewService) {
        this.review = params.get('item');
        if (this.review && this.review.id) {
            this.reviewService.find(this.review.id).subscribe(data => {
                this.review = data;
            });
        } else {
            this.review = new Review();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.review.id : null],
            title: [params.get('item') ? this.review.title : null,  Validators.required],
            description: [params.get('item') ? this.review.description : null,  Validators.required],
            like: [params.get('item') ? this.review.like : null, ],
            dislike: [params.get('item') ? this.review.dislike : null, ],
            date: [params.get('item') ? this.review.date : null, ],
            image: [params.get('item') ? this.review.image : null, ],
            imageContentType: [params.get('item') ? this.review.imageContentType : ''],
            video: [params.get('item') ? this.review.video : null, ],
            videoContentType: [params.get('item') ? this.review.videoContentType : ''],
            imagepath: [params.get('item') ? this.review.imagepath : null, ],
            videopath: [params.get('item') ? this.review.videopath : null, ],
            userProfile: [params.get('item') ? this.review.userProfileId : '',],
            business: [params.get('item') ? this.review.businessId : '',],
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
        this.businessService.query()
            .subscribe(data => { this.businesses = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the review, so return it
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
                this.review[fieldName] = data;
                this.review[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.review, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUserProfile(first: UserProfile, second: UserProfile): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserProfileById(index: number, item: UserProfile) {
        return item.id;
    }
    compareBusiness(first: Business, second: Business): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackBusinessById(index: number, item: Business) {
        return item.id;
    }
}
