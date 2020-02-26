import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

import { RegExpService } from '../../../../core/services/regexp/regexp.service';
import { CheckAnimationService } from '../../../../core/services/check-animation/check-animation.service';

@Component({
    selector: 'prtf-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, OnDestroy {

    private static TYPING_SPEED = 35;
    private static TYPING_DELAY = 500;
    private static HIGHLIGHT_TEXT = 'tak';

    @ViewChild('typingElement') private typingElement: ElementRef;

    public shouldBlink = true;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    private typingWord: string[];
    private index = 0;
    private terminalText = `env | grep tak
            NAME=Hyungtak Jin
            EMAIL=env.tak@gmail.com
            BLOG=https://tak-bro.github.io
            GITHUB=tak-bro
            LINKED_IN=https://www.linkedin.com/in/hyungtak/
            RESUME=https://tak-bro.github.io/assets/resume.pdf`;

    constructor(private regExpService: RegExpService,
                private checkAnimationService: CheckAnimationService) {
    }

    ngOnInit() {
        const finishSvgFaceDrawn$ = this.checkAnimationService.getIsSvgFaceDrawn().pipe(
            filter(isDrawn => isDrawn),
            delay(TerminalComponent.TYPING_DELAY),
            takeUntil(this.destroyed$)
        );

        finishSvgFaceDrawn$.subscribe(() => {
            this.setTypingWord();
            this.typeItOut();
            this.shouldBlink = false;
        });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    private setTypingWord() {
        const replacedText = this.addSpanTagByKey(this.terminalText, TerminalComponent.HIGHLIGHT_TEXT);
        this.typingWord = this.getParsedString(replacedText);
    }

    private typeItOut() {
        const isDone = this.index >= this.typingWord.length;
        if (isDone) {
            this.setHyperLinkToTerminal();
            this.addTerminalInput();
            return;
        }

        // typing word...
        this.typingElement.nativeElement.innerHTML += this.typingWord[this.index];
        this.index++;
        setTimeout(() => {
            this.typeItOut();
        }, TerminalComponent.TYPING_SPEED);
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

        const spanTagStrings = matchedArray.map(arr => arr.split('').map(letter => `<span class="highlight">${letter}</span>`).join(''));
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
