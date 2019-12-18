import { Component, OnInit, HostListener } from '@angular/core';
import * as Vivus from 'vivus';

import { CheckAnimationService } from '../../../../core/services/check-animation/check-animation.service';

const DRAWING_DURATION = 75;
const MAX_SCREEN_WIDTH = 1024;
const EYE_STROKE_WIDTH = '25';

@Component({
    selector: 'prtf-svg-face',
    templateUrl: './svg-face.component.html',
    styleUrls: ['./svg-face.component.scss']
})
export class SvgFaceComponent implements OnInit {

    public eyeColor = '#fff';
    public eyeStrokeWidth = '1';
    public svgFaceDisplay = 'none';
    private isDrawn = false;
    private screenWidth: any;

    constructor(private checkAnimationService: CheckAnimationService) {
        this.getScreenSize();
        this.checkAnimationService.setIsSvgFaceDrawn(this.isDrawn);
    }

    ngOnInit() {
        this.svgFaceDisplay = 'block';
        this.drawSvgFace();
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize() {
        this.screenWidth = window.innerWidth;
        if (!this.isDrawn) {
            return;
        }
        this.eyeColor = this.getEyeColor();
    }

    private drawSvgFace() {
        const afterDrawn = () => {
            this.fillEyeColor();
            this.doneSvgDrawn();
        };
        const svgFace = new Vivus('avatar', {
            duration: DRAWING_DURATION,
            type: 'sync',
            animTimingFunction: Vivus.EASE
        }, afterDrawn);
    }

    private fillEyeColor() {
        this.eyeColor = this.getEyeColor();
        this.eyeStrokeWidth = EYE_STROKE_WIDTH;
    }

    private getEyeColor() {
        if (this.screenWidth <= MAX_SCREEN_WIDTH) {
            return '#bbb';
        }
        return '#3c3c3c';
    }

    private doneSvgDrawn() {
        this.isDrawn = true;
        this.checkAnimationService.setIsSvgFaceDrawn(this.isDrawn);
    }
}
