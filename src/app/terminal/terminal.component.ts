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
            NAME=Hyung<span class="highlight">t</span><span class="highlight">a</span><span class="highlight">k</span> Jin
            EMAIL=env.<span class="highlight">t</span><span class="highlight">a</span><span class="highlight">k</span>@gmail.com
            GITHUB=tak-bro
            BLOG=tak-bro.github.io
            RESUME=https://docs.google.com/tak....
            `;


            const fragments = txt.split(/(\<+[a-zA-Z0-9\=\"\s]+\>+[^<]+\<\/+[a-zA-Z0-9]+\>)/gi);
            const typingWord = [];
            fragments.map((word) => {
                if (word.includes('<span')) {
                    typingWord.push(word);
                } else {
                    word.split('').map(tmp => typingWord.push(tmp));
                }
            });

            if (this.index < typingWord.length) {
                // this.demoTerminal.nativeElement.innerHTML += txt.charAt(this.index);
                this.demoTerminal.nativeElement.innerHTML += typingWord[this.index]
                this.index++;
                setTimeout(() => {
                    this.typeItOut();
                }, speed);
            }
        }, speed);
    }
}
