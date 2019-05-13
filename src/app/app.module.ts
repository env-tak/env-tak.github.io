import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FooterComponent } from './core/footer/footer.component';
import { RegExpService } from './core/services/regexp/regexp.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { TerminalComponent } from './modules/terminal/terminal.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TerminalComponent,
        NotFoundComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [RegExpService],
    bootstrap: [AppComponent]
})
export class AppModule { }
