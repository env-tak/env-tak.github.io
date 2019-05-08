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

    private typingWord: string[];
    private index = 0;
    private terminalText = `env | grep tak
            NAME=Hyungtak Jin
            EMAIL=env.tak@gmail.com
            GITHUB=tak-bro
            BLOG=https://tak-bro.github.io
            KOREAN_RESUME=http://bit.ly/tak_resume_kor
            ENGLISH_RESUME=http://bit.ly/tak_resume_eng
            `;

    public ngOnInit() {
        this.setTypingWord();
        this.typeItOut();
    }

    private setTypingWord() {
        const replacedText = this.addSpanTagByKey(this.terminalText, 'tak');
        this.typingWord = this.getParsedString(replacedText);
    }

    private typeItOut() {
        const TYPING_SPEED = 30;
        setTimeout(() => {
            const isDone = this.index >= this.typingWord.length;
            if (!isDone) {
                this.demoTerminal.nativeElement.innerHTML += this.typingWord[this.index];
                this.index++;
                setTimeout(() => {
                    this.typeItOut();
                }, TYPING_SPEED);
            }
        }, TYPING_SPEED);
    }

    private addSpanTagByKey(text: string, key: string) {
        const taggedKey = key.split('').map(letter => `<span class="highlight">${letter}</span>`).join('');
        const replacedText = text.replace(new RegExp(key, 'gi'), taggedKey);
        return replacedText;
    }

    private getParsedString(text: string) {
        const fragments = text.split(/(\<+[a-zA-Z0-9\=\"\s]+\>+[^<]+\<\/+[a-zA-Z0-9]+\>)/gi);
        const typingWord = [];
        fragments.map((word) => {
            const hasSpanTag = word.includes('<span');
            if (hasSpanTag) {
                typingWord.push(word);
            } else {
                word.split('').map(tmp => typingWord.push(tmp));
            }
        });
        return typingWord;
    }
}
