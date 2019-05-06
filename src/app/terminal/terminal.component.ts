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
        // TODO: typeItOut 함수 아래처럼 사용하기
        // http://jsfiddle.net/creed88/VG8MJ/1/
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
