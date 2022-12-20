import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { masterDataRoutes } from './master.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseAlertModule } from '@fuse/components/alert';

import { MatTabsModule } from '@angular/material/tabs';

import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserComponent } from './users/listing/user.component';
import { TranslocoModule } from '@ngneat/transloco';
import { UserDialog } from './users/dialog/user-dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserResolver } from './users/user.resolvers';
import { MatAutocompleteModule } from '@angular/material/autocomplete';




@NgModule({
    declarations: [
        UserComponent,UserDialog
    ],
    imports: [
        RouterModule.forChild(masterDataRoutes),
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        FuseAlertModule,
        MatDividerModule,
        MatPaginatorModule,
        MatMenuModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        NgApexchartsModule,
        SharedModule,
        TranslocoModule,
        MatIconModule,
        MatAutocompleteModule
    ],
    providers: [
        UserResolver,
        
       
      ],
})
export class MasterDataModule {
}
