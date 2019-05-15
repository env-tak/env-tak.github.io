import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPageRoutingModule } from './full-page-routing.module';
import { FullPageComponent } from './full-page.component';

@NgModule({
    declarations: [
        FullPageComponent,
    ],
    imports: [
        CommonModule,
        FullPageRoutingModule,
    ]
})
export class FullPageModule { }
