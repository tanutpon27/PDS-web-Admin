import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
// import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { PrivacyPolicyComponent } from 'app/modules/policy/privacy-policy/privacy-policy.component';

import { PrivacyPolicyRoutes } from 'app/modules/policy/privacy-policy/privacy-policy.routing';

@NgModule({
    declarations: [PrivacyPolicyComponent],
    imports: [
        RouterModule.forChild(PrivacyPolicyRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
    ],
})
export class PrivacyPolicyModule {}
