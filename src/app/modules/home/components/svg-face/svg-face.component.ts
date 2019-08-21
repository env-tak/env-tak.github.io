import { Component, OnInit } from '@angular/core';
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

    constructor() {
    }

    ngOnInit() {
        this.svgFaceDisplay = 'block';
        this.drawSvgFace();
    }

    private drawSvgFace() {
        const afterDrawed = () => {
            this.fillEyeColor();
        };
        const svgFace = new Vivus('avatar', {
            duration: 100,
            type: 'sync',
            animTimingFunction: Vivus.EASE
        }, afterDrawed);
    }

    private fillEyeColor() {
        this.eyeColor = '#3c3c3d';
        this.eyeStrokeWidth = '25';
    }
}
