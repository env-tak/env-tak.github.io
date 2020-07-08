import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

// components
import { TerminalComponent } from './components/terminal/terminal.component';
import { SvgFaceComponent } from './components/svg-face/svg-face.component';
import { GitbubCornerComponent } from './components/github-corner/gitbub-corner.component';

// pages
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [
        // components
        TerminalComponent,
        SvgFaceComponent,
        GitbubCornerComponent,
        // pages
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
})
export class HomeModule { }
