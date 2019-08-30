import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegExpService } from '../../../../core/services/regexp.service';

@Component({
    selector: 'prtf-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

    @ViewChild('typingElement') private typingElement: ElementRef;

    public shouldBlink = true;
    private typingWord: string[];
    private index = 0;
    private terminalText = `env | grep tak
            NAME=Hyungtak Jin
            EMAIL=env.tak@gmail.com
            BLOG=https://tak-bro.github.io
            GITHUB=tak-bro
            LINKEDIN=https://www.linkedin.com/in/hyungtak/
            KOREAN_RESUME=http://bit.ly/tak_resume_kor
            ENGLISH_RESUME=http://bit.ly/tak_resume_eng`;

    constructor(private regExpService: RegExpService) {
    }

    public ngOnInit() {
        this.setTypingWord();

        const SVG_FACE_DRAWING_DELAY  = 2000;
        setTimeout(() => {
            this.shouldBlink = false;
            this.typeItOut();
        }, SVG_FACE_DRAWING_DELAY);
    }

    private setTypingWord() {
        const HIGHLIGHT_TEXT = 'tak';
        const replacedText = this.addSpanTagByKey(this.terminalText, HIGHLIGHT_TEXT);
        this.typingWord = this.getParsedString(replacedText);
    }

    private typeItOut() {
        const TYPING_SPEED = 20;
        setTimeout(() => {
            const isDone = this.index >= this.typingWord.length;
            if (isDone) {
                this.setHyperLinkToTerminal();
                this.addTerminalInput();
            }

            if (!isDone) {
                this.typingElement.nativeElement.innerHTML += this.typingWord[this.index];
                this.index++;
                setTimeout(() => {
                    this.typeItOut();
                }, TYPING_SPEED);
            }
        }, TYPING_SPEED);
    }

    private addTerminalInput() {
        const inputElementText = `<br><br><span class="name">tak</span> <span class="dash">~ $ </span>`;
        this.typingElement.nativeElement.innerHTML += inputElementText;
        this.shouldBlink = true;
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
        const fragments = this.regExpService.splitStringWithTag(text);
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
        let text = this.addHyperLinkTag(this.typingElement.nativeElement.innerHTML);
        text = this.addEmailLinkTag(text);
        this.typingElement.nativeElement.innerHTML = text;
    }

    private addHyperLinkTag(text: string) {
        const parseHyperLink = (tag, ...args) => {
            const stripHtmlTags = tag.replace(/<[^>]*>/gi, '');
            return `<a href="${stripHtmlTags}" target="_blank">${tag}</a>`;
        };

        const innerHtmlContent = text.replace(this.regExpService.checkIsDomain(), parseHyperLink);
        return innerHtmlContent;
    }

    private addEmailLinkTag(text: string) {
        const parseEmailLink = (tag, ...args) => {
            const stripHtmlTags = tag.replace(/<[^>]*>/gi, '');
            return `<a href="mailto:${stripHtmlTags}">${tag}</a>`;
        };

        const innerHtmlContent = text.replace(this.regExpService.checkIsEmail(), parseEmailLink);
        return innerHtmlContent;
    }
}
