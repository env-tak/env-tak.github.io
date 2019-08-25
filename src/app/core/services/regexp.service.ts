import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegExpService {

    constructor() {}

    deleteAllHtmlTag(text: string) {
        return text.replace(/<(?:.|\n)*?>/gm, '');
    }

    // refer: https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
    addHyperLinkTag(text: string) {
        let replacedText: string;

        // URLs starting with http://, https://, or ftp://
        const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        return replacedText;
    }

    addEmailLinkTag(text: string) {
        // Change email addresses to mailto:: links.
        const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
        return text.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
    }

    splitStringWithTag(text: string) {
        return text.split(/(\<+[a-zA-Z0-9\=\"\s]+\>+[^<]+\<\/+[a-zA-Z0-9]+\>)/gi);
    }

    splitStringByTag(text: string) {
        return text.split(/(<.+?>)(.+?)(<\/.+?>)/g);
    }

    checkIsDomain() {
        return /(\b(https?|):\/\/.*)/g;
    }
}
