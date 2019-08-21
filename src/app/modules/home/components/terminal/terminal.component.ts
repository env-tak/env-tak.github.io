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
            BLOG=https://tak-bro.github.io
            GITHUB=tak-bro
            LINKEDIN=https://www.linkedin.com/in/hyungtak/
            KOREAN_RESUME=http://bit.ly/tak_resume_kor
            ENGLISH_RESUME=http://bit.ly/tak_resume_eng
            `;

    constructor() {
    }

    public ngOnInit() {
        this.setTypingWord();
        setTimeout(() => this.typeItOut(), 2000);
    }

    private setTypingWord() {
        const replacedText = this.addSpanTagByKey(this.terminalText, 'tak');
        this.typingWord = this.getParsedString(replacedText);
    }

    private typeItOut() {
        const TYPING_SPEED = 20;
        setTimeout(() => {
            const isDone = this.index >= this.typingWord.length;
            if (isDone) {
                this.setHyperLinkToTerminal();
            }

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
        const replaceAll = (str, searchStr, replaceStr) => str.split(searchStr).join(replaceStr);

        const regex = new RegExp(key, 'gi');
        const matchedArray = text.match(regex);
        if (!matchedArray || matchedArray.length === 0) {
            return text;
        }

        const spanTagStrings = matchedArray.map(arr => {
            return arr.split('').map(letter => `<span class="highlight">${letter}</span>`).join('');
        });
        const replacedText = replaceAll(text, new RegExp(key, 'gi'), spanTagStrings.shift());
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

    private setHyperLinkToTerminal() {
        const text = this.addHyperLinkTag(this.demoTerminal.nativeElement.innerHTML);
        this.demoTerminal.nativeElement.innerHTML = text;
    }

    private addHyperLinkTag(text: string) {
        const checkDomain = /(\b(https?|):\/\/.*)/g;
        const parseString = (tag, ...args) => {
            const stripHtmlTags = tag.replace(/<[^>]*>/gi, '');
            return `<a href=${stripHtmlTags} target="_blank">${tag}</a>`;
        };

        const innerHtmlContent = text.replace(checkDomain, parseString);
        return innerHtmlContent;
    }
}
