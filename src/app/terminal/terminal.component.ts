import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'prtf-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: [
        './terminal.component.scss'
    ]
})
export class TerminalComponent implements OnInit {
    @ViewChild('demo') private demoTerminal: ElementRef;
    private index = 0;

    public ngOnInit() {
        this.typeItOut();
    }

    private typeItOut() {
        const speed = 30;
        setTimeout(() => {
            const txt = `env | grep tak
            NAME=Hyungtak Jin
            EMAIL=env.tak@gmail.com
            GITHUB=tak-bro
            BLOG=tak-bro.github.io
            RESUME=https://docs.google.com/tak....
            `;

            if (this.index < txt.length) {
                this.demoTerminal.nativeElement.innerHTML += txt.charAt(this.index);
                this.index++;
                setTimeout(() => {
                    this.typeItOut();
                }, speed);
            }
        }, speed);
    }
}
