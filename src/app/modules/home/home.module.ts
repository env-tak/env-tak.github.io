import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { SvgFaceComponent } from './components/svg-face/svg-face.component';

@NgModule({
    declarations: [
        HomeComponent,
        TerminalComponent,
        SvgFaceComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
})
export class HomeModule { }
