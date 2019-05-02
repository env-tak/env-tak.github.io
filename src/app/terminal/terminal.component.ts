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
    private typingWord;

    public ngOnInit() {
        this.setTypingWord();
        this.typeItOut();
    }

    private setTypingWord() {
        const text = `env | grep tak
            NAME=Hyungtak Jin
            EMAIL=env.tak@gmail.com
            GITHUB=tak-bro
            BLOG=https://tak-bro.github.io
            KOREAN_RESUME=http://bit.ly/tak_resume_kor
            ENGLISH_RESUME=http://bit.ly/tak_resume_eng
            `;

        // const replacedText = this.addHyperLink(text);
        const replacedTextWithSpan = this.setSpanTagByKey(text, 'tak');
        this.typingWord = this.getParsedString(replacedTextWithSpan);
    }

    private typeItOut() {
        const TYPING_SPEED = 30;
        setTimeout(() => {
            if (this.index < this.typingWord.length) {
                this.demoTerminal.nativeElement.innerHTML += this.typingWord[this.index];
                this.index++;
                setTimeout(() => {
                    this.typeItOut();
                }, TYPING_SPEED);
            }
        }, TYPING_SPEED);
    }

    // refer: https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
    private addHyperLink(text: string) {
        let replacedText;

        // URLs starting with http://, https://, or ftp://
        const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        // Change email addresses to mailto:: links.
        const replacePattern3 = /(\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    }

    private setSpanTagByKey(text: string, key: string) {
        const taggedKey = key.split('').map(letter => `<span class="highlight">${letter}</span>`).join('');
        const result = text.replace(new RegExp(key, 'gi'), taggedKey);
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
