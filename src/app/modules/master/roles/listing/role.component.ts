import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'app/core/auth/auth.service';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { SettingsService } from 'app/core/settings/settings.sevice';
import { NgxPermissionsService } from 'ngx-permissions';
import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Role } from '../../users/user.types';
import { RoleDialog } from '../dialog/role-dialog';

import { RoleService } from '../role.service';
import { ConfigPermission, PermissionsRole } from '../role.types';

@Component({
    selector: 'role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public roles: Observable<Role[]>;
    permissionsRole: PermissionsRole[] = [];
    ADD = [];
    UPDATE = [];
    DELETE = [];
    /**
     * Constructor
     */
    constructor(
        private _roleService: RoleService,
        public _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _translocoService: TranslocoService,
        private _settingsService: SettingsService,
        private _dialog: MatDialog,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _navigationServicee: NavigationService,
        private permissionsService: NgxPermissionsService
    ) {
        this._roleService.permissionsRole$.subscribe(
            (p) => (this.permissionsRole = p)
        );
        const perm = [];
        this._settingsService.getRole().subscribe((item) => {
            perm.push(
                item.find(
                    (obj) => obj.id === this._authService.user.user_role_id
                ).normalize_name
            );
            this.permissionsService.loadPermissions(perm);
        });

        this.roles = this._settingsService.role$;
        this.ADD = this._navigationServicee.permissionConfig(
            window.location.pathname,
            'ADD'
        );
        this.UPDATE = this._navigationServicee.permissionConfig(
            window.location.pathname,
            'UPDATE'
        );
        this.DELETE = this._navigationServicee.permissionConfig(
            window.location.pathname,
            'DELETE'
        );
    }

    ngAfterViewInit(): void {}

    ngOnInit(): void {}
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    confirmDelete(role: Role, event) {
        this.removePermissions(role);
        if (event) {
            event.stopPropagation();
        }
        const dialogRef = this._fuseConfirmationService.open({
            title: this._translocoService.translate<string>(
                'user.delete.title'
            ),
            message: this._translocoService.translate<string>(
                'user.delete.message'
            ),
            actions: {
                confirm: {
                    label: this._translocoService.translate<string>(
                        'user.delete.delete'
                    ),
                },
                cancel: {
                    label: this._translocoService.translate<string>(
                        'user.delete.cancel'
                    ),
                },
            },
        });
        dialogRef
            .afterClosed()
            .pipe(
                filter((r) => r == 'confirmed'),
                switchMap(() =>
                this._roleService.delete({
                    id: role.id,
                    permissions: this.permissionsRole,
                })
                ),
                switchMap(() => this._settingsService.getRole()),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe();
    }
    openEditModal(role: Role, event) {
        const dialogRef = this._dialog.open(RoleDialog, {
            minHeight: '200px',
            minWidth: '700px',
            maxHeight: '90vh',
            data: role,
        });
        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._settingsService.getRole().subscribe();
                this._roleService.getPermissionsRole().subscribe();
            });
    }
    removePermissions(role: Role) {
        this.permissionsRole.forEach((page) => {
            if (page.childrens.length == 1) {
                page.childrens.forEach((child) => {
                    child.role = this.removeRole(
                        child.role,
                        role.normalize_name
                    );
                    child.config_permissions.forEach((config) => {
                        config.role = this.removeRole(
                            config.role,
                            role.normalize_name
                        );
                    });
                });
            } else if (page.childrens.length > 1) {
                page.childrens.forEach((child) => {
                    child.role= this.removeRole(
                        child.role,
                        role.normalize_name
                    );
                    child.config_permissions.forEach((config) => {
                        config.role = this.removeRole(
                            config.role,
                            role.normalize_name
                        );
                    });
                })

            }
        });
        console.log(this.permissionsRole);
        
    }

    removeRole(role: string, name: string): string {
        if (role != '') {
            let modified = role.split(',').filter((word) => word !== name);
            role = modified.join(',');
        }
        return role;
    }
}
