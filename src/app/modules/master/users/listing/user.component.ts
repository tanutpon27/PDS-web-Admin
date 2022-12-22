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
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'app/core/auth/auth.service';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { SettingsService } from 'app/core/settings/settings.sevice';
import { NgxPermissionsService } from 'ngx-permissions';
import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { UserDialog } from '../dialog/user-dialog';
import { UserService } from '../user.service';
import { Role, UserList } from '../user.types';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
  
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    data: UserList[] = [];
    public roles: Observable<Role[]>;
    ADD = [];
    UPDATE = [];
    DELETE = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        public _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _translocoService: TranslocoService, private _dialog: MatDialog,private _settingsService: SettingsService,
        private _navigationServicee: NavigationService,
        private permissionsService: NgxPermissionsService
    ) {
        this.roles = this._settingsService.role$;
        const perm = [];
        this._settingsService.getRole().subscribe(
            (item)=>{
                perm.push(item.find((obj) => obj.id === this._authService.user.user_role_id).normalize_name);
                this.permissionsService.loadPermissions(perm);
            }
        );
        
        
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._userService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data;
               
            });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    confirmDelete(user: UserList, event) {
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
                  this._userService.delete(user.id)
                ),
                switchMap(() => this._userService.getData()),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe();
    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    openEditModal(user: UserList, event) {
 
    
        const dialogRef = this._dialog.open(UserDialog, {
          minHeight: '400px',
          minWidth: '600px',
          maxHeight: '90vh',
          data: user,
          
        });
        dialogRef.afterClosed().pipe(
          takeUntil(this._unsubscribeAll),
        ).subscribe(
            () => location.reload()
        );
      }
}
