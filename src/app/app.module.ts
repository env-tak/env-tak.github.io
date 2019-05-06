import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegExpService } from './services/regexp/regexp.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TerminalComponent } from './terminal/terminal.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TerminalComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [RegExpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
