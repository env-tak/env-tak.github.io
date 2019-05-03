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
        // const hyperLinkText = this.addHyperLink(this.terminalText);
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

    private deleteAllHtmlTag(text: string) {
        return text.replace(/<(?:.|\n)*?>/gm, '');
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
        // const replacePattern3 = /(\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
        const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    }

    private addSpanTagByKey(text: string, key: string) {
        // console.log(text.split(/(\<[^>]*>+[^<]+\<\/+[a-zA-Z0-9]+\>)/gi)); // tag 포함 ['123', '<a href="asdsa">asdas</a>', 'asdas']
        // console.log(text.split(/(<[^>]*>)/gi)); // tag 별로 나누기 ['123', '<a href="asd">', 'asdasd', '</a>', 'asdas']
        // console.log(text.split(/(<.+?>)(.+?)(<\/.+?>)/g));// tag 별로 나누기 ['123', '<a href="asd">', 'asdasd', '</a>', 'asdas']
        // const replacedText = text.split(/(<.+?>)(.+?)(<\/.+?>)/g).map(splited => {
        //     const hasATag = splited.includes('<a') || splited.includes('</a');
        //     if (hasATag) {
        //         return splited;
        //     } else {
        //         return splited.replace(new RegExp(key, 'gi'), taggedKey);
        //     }
        // }).join('');
        const taggedKey = key.split('').map(letter => `<span class="highlight">${letter}</span>`).join('');
        const replacedText = text.replace(new RegExp(key, 'gi'), taggedKey);
        return replacedText;
    }

    private getParsedString(text: string) {
        // const fragments = text.split(/(\<[^>]*>+[^<]+\<\/+[a-zA-Z0-9]+\>)/gi);
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
