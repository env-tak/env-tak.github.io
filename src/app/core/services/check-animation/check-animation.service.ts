import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CheckAnimationService {

    private isSvgFaceDrawn = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    setIsSvgFaceDrawn(isDrawn: boolean) {
        this.isSvgFaceDrawn.next(isDrawn);
    }

    getIsSvgFaceDrawn() {
        return this.isSvgFaceDrawn.asObservable();
    }
}
