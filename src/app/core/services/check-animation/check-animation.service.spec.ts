import { TestBed } from '@angular/core/testing';

import { CheckAnimationService } from './check-animation.service';
import {filter} from 'rxjs/operators';

describe('CheckAnimationService', () => {

    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(CheckAnimationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('.getIsSvgFaceDrawn() should return value from observable', (done: DoneFn) => {
        service.getIsSvgFaceDrawn().subscribe(value => {
            expect(value).toBeFalsy();
            done();
        });
    });

    it('.getIsSvgFaceDrawn() should return true after set value', (done: DoneFn) => {
        service.setIsSvgFaceDrawn(true);

        const result$ = service.getIsSvgFaceDrawn().pipe(filter((isDrawn: boolean) => isDrawn));
        result$.subscribe(data => {
            expect(data).toBeTruthy();
            done();
        });
    });

});
