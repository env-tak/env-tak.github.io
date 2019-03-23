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
            const txt = `scribbler
            [Entry mode; press Ctrl+D to save and quit; press Ctrl+C to quit without saving]

            ###todo for new year dinner party

            - milk
            - butter
            - green onion
            - lots and lots of kiwis 🥝`;
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
