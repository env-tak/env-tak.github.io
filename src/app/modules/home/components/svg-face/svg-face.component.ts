import { Component, OnInit, HostListener } from '@angular/core';
import * as Vivus from 'vivus';

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

    constructor() {
        this.getScreenSize();
    }

    ngOnInit() {
        this.svgFaceDisplay = 'block';
        this.drawSvgFace();
    }

    private drawSvgFace() {
        const afterDrawn = () => {
            this.fillEyeColor();
        };
        const svgFace = new Vivus('avatar', {
            duration: 100,
            type: 'sync',
            animTimingFunction: Vivus.EASE
        }, afterDrawn);
    }

    private fillEyeColor() {
        this.isDrawn = true;
        this.eyeColor = this.getEyeColor();
        this.eyeStrokeWidth = '25';
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize() {
        this.screenWidth = window.innerWidth;
        if (!this.isDrawn) {
            return;
        }
        this.eyeColor = this.getEyeColor();
    }

    private getEyeColor() {
        if (this.screenWidth <= 1024) {
            return '#bbb';
        }
        return '#3c3c3c';
    }
}
