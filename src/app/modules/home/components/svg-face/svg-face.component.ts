import { Component, OnInit, HostListener } from '@angular/core';
import * as Vivus from 'vivus';

import { CheckAnimationService } from '../../../../core/services/check-animation/check-animation.service';

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
            duration: 100,
            type: 'sync',
            animTimingFunction: Vivus.EASE
        }, afterDrawn);
    }

    private fillEyeColor() {
        this.eyeColor = this.getEyeColor();
        this.eyeStrokeWidth = '25';
    }

    private getEyeColor() {
        if (this.screenWidth <= 1024) {
            return '#bbb';
        }
        return '#3c3c3c';
    }

    private doneSvgDrawn() {
        this.isDrawn = true;
        this.checkAnimationService.setIsSvgFaceDrawn(this.isDrawn);
    }
}
