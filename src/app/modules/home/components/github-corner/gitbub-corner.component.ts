import { Component, Input } from '@angular/core';

@Component({
    selector: 'prtf-github-corner',
    templateUrl: './github-corner.component.html',
    styleUrls: ['./github-corner.component.scss']
})
export class GitbubCornerComponent {

    @Input() githubURL = 'https://github.com/env-tak/env-tak.github.io';

    constructor() {
    }
}
