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

export class UserProfile implements BaseEntity {
    constructor(
        public id?: number,
        public state?: State,
        public city?: string,
        public address?: string,
        public phone?: string,
        public imageContentType?: string,
        public image?: any,
        public since?: any,
        public owner?: boolean,
        public imagepath?: string,
        public userId?: number,
        public businesses?: BaseEntity[],
        public reviews?: BaseEntity[],
    ) {
        this.owner = false;
    }
}
