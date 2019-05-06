import { TestBed } from '@angular/core/testing';

import { RegExpService } from './regexp.service';

describe('RegExpService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: RegExpService = TestBed.get(RegExpService);
        expect(service).toBeTruthy();
    });

    it('should delete all html tags in texst', () => {
        const service: RegExpService = TestBed.get(RegExpService);
        const testStr = 'This is <strong>test</strong> <a href="test">string</a>.';
        const expectedStr = 'This is test string.';

        const deletedStr = service.deleteAllHtmlTag(testStr);
        expect(deletedStr).toEqual(expectedStr);
    });


    it('should add a tag when text starting with http://, https://, ftp://', () => {
        const service: RegExpService = TestBed.get(RegExpService);
        const testStr = 'https://test.url';
        const expectedStr = `<a href="${testStr}" target="_blank">${testStr}</a>`;

        const replacedStr = service.addHyperLinkTag(testStr);
        expect(expectedStr).toEqual(replacedStr);
    });

    it('should add a tag when text starting with www', () => {
        const service: RegExpService = TestBed.get(RegExpService);
        const testStr = 'www.test.url';
        const expectedStr = `<a href="http://${testStr}" target="_blank">${testStr}</a>`;

        const replacedStr = service.addHyperLinkTag(testStr);
        expect(expectedStr).toEqual(replacedStr);
    });

    it('should add a email tag', () => {
        const service: RegExpService = TestBed.get(RegExpService);
        const testStr = 'njirtak@gmail.com';
        const expectedStr = `<a href="mailto:${testStr}">${testStr}</a>`;

        const replacedStr = service.addEmailLinkTag(testStr);
        expect(expectedStr).toEqual(replacedStr);
    });

});
