import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { TerminalComponent } from './components/terminal/terminal.component';

@NgModule({
    declarations: [
        HomeComponent,
        TerminalComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
    ],
})
export class HomeModule { }
