import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialMasterComponent } from './material/material.component';

const masterDataRoutes: Route[] = [
    {
        path: 'material',
        component: MaterialMasterComponent
    }
];

@NgModule({
    declarations: [
        MaterialMasterComponent
    ],
    imports: [
        RouterModule.forChild(masterDataRoutes),
        MatButtonModule,
        MatIconModule,
        // // MatMenuModule,
        // //MatSidenavModule,
        SharedModule
    ]
})
export class MasterDataModule {
}
