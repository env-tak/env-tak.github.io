import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GithubCornerComponent } from './github-corner.component';

describe('Component: GithubCornerComponent', () => {
    let component: GithubCornerComponent;
    let fixture: ComponentFixture<GithubCornerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GithubCornerComponent],
        });
        fixture = TestBed.createComponent(GithubCornerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the default @Input value', () => {
        const defaultValue = 'https://github.com/env-tak/env-tak.github.io';
        const compiledComponent = fixture.nativeElement.querySelector('a');
        expect(compiledComponent.href).toBe(defaultValue);
    });
});
