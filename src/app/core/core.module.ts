import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';

import { RegExpService } from './services/regexp/regexp.service';
import { CheckAnimationService } from './services/check-animation/check-animation.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        RegExpService,
        CheckAnimationService,
    ]
})
export class CoreModule implements EnsureModuleLoadedOnceGuard { }
