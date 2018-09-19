import { BaseEntity } from './../../../models';

export class Review implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public like?: number,
        public dislike?: number,
        public date?: any,
        public imageContentType?: string,
        public image?: any,
        public videoContentType?: string,
        public video?: any,
        public imagepath?: string,
        public videopath?: string,
        public userProfileId?: number,
        public businessId?: number,
    ) {
    }
}
