import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './core/auth/auth.service';
import { SettingsService } from './core/settings/settings.sevice';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(
        private permissionsService: NgxPermissionsService,
        private _authService: AuthService,
        private _settingsService: SettingsService
    ) {
        const perm = [];
        this._settingsService.getRole().subscribe((item) => {
            perm.push(
                item.find(
                    (obj) => obj.id === this._authService.user.user_role.id
                ).normalize_name
            );
            this.permissionsService.loadPermissions(perm);
        });
    }

    ngOnInit(): void {}
}
