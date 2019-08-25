import { TestBed } from '@angular/core/testing';

import { RegExpService } from './regexp.service';

describe('RegExpService', () => {

    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(RegExpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should delete all html tags in texst', () => {
        const testStr = 'This is <strong>test</strong> <a href="test">string</a>.';
        const expectedStr = 'This is test string.';
        const deletedStr = service.deleteAllHtmlTag(testStr);

        expect(deletedStr).toEqual(expectedStr);
    });

    it('should add a tag when text starting with http://, https://, ftp://', () => {
        const testStr = 'https://test.url';
        const expectedStr = `<a href="${testStr}" target="_blank">${testStr}</a>`;
        const replacedStr = service.addHyperLinkTag(testStr);

        expect(expectedStr).toEqual(replacedStr);
    });

    it('should add a tag when text starting with www', () => {
        const testStr = 'www.test.url';
        const expectedStr = `<a href="http://${testStr}" target="_blank">${testStr}</a>`;
        const replacedStr = service.addHyperLinkTag(testStr);

        expect(expectedStr).toEqual(replacedStr);
    });

    it('should add a email tag', () => {
        const testStr = 'njirtak@gmail.com';
        const expectedStr = `<a href="mailto:${testStr}">${testStr}</a>`;
        const replacedStr = service.addEmailLinkTag(testStr);

        expect(expectedStr).toEqual(replacedStr);
    });

    it('should split strings that contains tag', () => {
        const testStr = 'This is <strong>test</strong> <a href="test">string</a>.';
        const expected = ['This is ', '<strong>test</strong>', ' ', '<a href="test">string</a>', '.'];
        const replacedStr = service.splitStringWithTag(testStr);

        expect(expected).toEqual(replacedStr);
    });

    it('should split string by tag', () => {
        const testStr = 'This is <strong>test</strong> <a href="test">string</a>.';
        const expected = ['This is ', '<strong>', 'test', '</strong>', ' ', '<a href="test">', 'string', '</a>', '.'];
        const replacedStr = service.splitStringByTag(testStr);

        expect(expected).toEqual(replacedStr);
    });

    it('should check domain string', () => {
        const testStr = 'https://www.naver.com';
        const result = service.checkIsDomain().test(testStr);
        expect(result).toBeTruthy();

        const testStr2 = 'http://www.naver.com';
        const result2 = service.checkIsDomain().test(testStr2);
        expect(result2).toBeTruthy();

        const testStr3 = 'www.naver.com';
        const result3 = service.checkIsDomain().test(testStr3);
        expect(result3).toBeFalsy();
    });

});
