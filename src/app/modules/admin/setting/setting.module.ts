import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MainSettingComponent } from './setting.component';
import { MainSettingRoutes } from './setting.routing';

import { FuseDrawerModule } from '@fuse/components/drawer';
@NgModule({
    declarations: [
        MainSettingComponent
    ],
    imports     : [
        RouterModule.forChild(MainSettingRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,FuseDrawerModule
    ]
})
export class LandingHomeModule
{
}
