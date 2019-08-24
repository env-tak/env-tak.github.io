import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';

import { RegExpService } from './services/regexp.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        RegExpService,
    ]
})
export class CoreModule implements EnsureModuleLoadedOnceGuard { }
