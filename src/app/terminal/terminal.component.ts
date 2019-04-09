import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'prtf-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: [
        './terminal.component.scss'
    ]
})
export class TerminalComponent implements OnInit {
    @ViewChild('terminal') private demoTerminal: ElementRef;
    private index = 0;

    public ngOnInit() {
        this.typeItOut();
    }

    private typeItOut() {
        const speed = 30;
        setTimeout(() => {
            const text = `env | grep tak
            NAME=Hyungtak Jin
            EMAIL=env.tak@gmail.com
            GITHUB=tak-bro
            BLOG=https://tak-bro.github.io
            RESUME=https://docs.google.com/tak....
            `;

            const spanText = this.setSpanTagWithKey(text, 'tak');
            const typingWord = this.getParsedString(spanText);
            if (this.index < typingWord.length) {
                this.demoTerminal.nativeElement.innerHTML += typingWord[this.index];
                this.index++;
                setTimeout(() => {
                    this.typeItOut();
                }, speed);
            }
        }, speed);
    }

    private setSpanTagWithKey(text: string, key: string) {
        const keyWithTag = key.split('').map(item => `<span class="highlight">${item}</span>`).join('');
        const result = text.replace(new RegExp(key, 'gi'), keyWithTag);
        return result;
    }

    private getParsedString(text: string) {
        const fragments = text.split(/(\<+[a-zA-Z0-9\=\"\s]+\>+[^<]+\<\/+[a-zA-Z0-9]+\>)/gi);
        const typingWord = [];
        fragments.map((word) => {
            if (word.includes('<span')) {
                typingWord.push(word);
            } else {
                word.split('').map(tmp => typingWord.push(tmp));
            }
        });
        return typingWord;
    }
}
