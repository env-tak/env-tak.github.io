import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FullPageComponent } from './full-page.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FullPageComponent },
        ])
    ],
    exports: [RouterModule]
})
export class FullPageRoutingModule {}
