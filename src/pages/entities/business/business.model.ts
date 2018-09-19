import { BaseEntity } from './../../../models';

export const enum State {
    'ALBORZ',
    'ARDABIL',
    'AZERBAIJAN_EAST',
    'AZERBAIJAN_WEST',
    'BUSHEHR',
    'CHAHAR_MAHAAL_AND_BAKHTIARI',
    'FARS',
    'GILAN',
    'GOLESTAN',
    'HAMADAN',
    'HORMOZGAN',
    'ILAM',
    'ISFAHAN',
    'KERMAN',
    'KERMANSHAH',
    'KHORASAN_NORTH',
    'KHORASAN_RAZAVI',
    'KHORASAN_SOUTH',
    'KHUZESTAN',
    'KOHGILUYEH_AND_BOYER_AHMAD',
    'KURDISTAN',
    'LORESTAN',
    'MARKAZI',
    'MAZANDARAN',
    'QAZVIN',
    'QOM',
    'SEMNAN',
    'SISTAN_AND_BALUCHESTAN',
    'TEHRAN',
    'YAZD',
    'ZANJAN'
}

export class Business implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public state?: State,
        public address?: string,
        public phone?: string,
        public rate?: number,
        public since?: any,
        public link?: string,
        public reservation?: boolean,
        public delivery?: boolean,
        public wifi?: boolean,
        public imageContentType?: string,
        public image?: any,
        public videoContentType?: string,
        public video?: any,
        public paid?: boolean,
        public imagepath?: string,
        public videopath?: string,
        public userProfileId?: number,
        public reviews?: BaseEntity[],
    ) {
        this.reservation = false;
        this.delivery = false;
        this.wifi = false;
        this.paid = false;
    }
}
