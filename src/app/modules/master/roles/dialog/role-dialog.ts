import {
    Component,
    ViewEncapsulation,
    Inject,
    OnInit,
    OnDestroy,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
    of,
    Subject,
    exhaustMap,
    takeUntil,
    catchError,
    repeat,
    Observable,
    map,
    find,
    filter,
    switchMap,
} from 'rxjs';

import { TranslocoService } from '@ngneat/transloco';

import { SettingsService } from 'app/core/settings/settings.sevice';
import { Role } from '../../users/user.types';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { RoleService } from '../role.service';
import { Confic, Page, PermissionsRole } from '../role.types';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'role-dialog',
    templateUrl: './role-dialog.html',
})
export class RoleDialog implements OnInit, OnDestroy {
    public title: string;

    private _submitted: boolean = false;
    public form: UntypedFormGroup;

    permissionsRole: PermissionsRole[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _userSubmit$ = new Subject();
    private _addMode: boolean = true;
    public roles: Observable<Role[]>;
    public permissions: Observable<PermissionsRole[]>;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _dialogRef: MatDialogRef<RoleDialog>,
        private _formBuilder: UntypedFormBuilder,
        private fb: FormBuilder,
        private _translocoService: TranslocoService,
        private _settingsService: SettingsService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _roleService: RoleService
    ) {
        this.permissions = this._roleService.permissionsRole$;
        this.roles = this._settingsService.role$;
        this.form = this._formBuilder.group(this.createFormGroup());

        this.bindFormData(_data);
        this.permissions.subscribe((p) => (this.permissionsRole = p));
    }

    ngOnInit(): void {
        this._userSubmit$
            .pipe(
                takeUntil(this._unsubscribeAll),
                catchError(() => of(false)),
                repeat(),
                exhaustMap(() => {
                    return this._addMode
                        ? this._roleService.create({
                              name: this.setFirstCharToUpperCase(
                                  this.form.get('normalize_name').value
                              ),
                              normalize_name: this.form
                                  .get('normalize_name')
                                  .value.toUpperCase(),
                              permissions: this.permissionsRole,
                          })
                        : this._roleService.update({
                              id: this.form.get('id').value,
                              active: this.form.get('active').value ? 1 : 0,
                              name: this.setFirstCharToUpperCase(
                                  this.form.get('normalize_name').value
                              ),
                              normalize_name: this.form
                                  .get('normalize_name')
                                  .value.toUpperCase(),

                              permissions: this.permissionsRole,
                          });
                }),
                catchError(() => of(false)),
                repeat()
            )
            .subscribe((res) => {
                if (res !== false) {
                    location.reload();
                }
                
                this._submitted = false;
            });
    }
    ngafterviewinit(): void {}

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    setFirstCharToUpperCase(str: string) {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    private createFormGroup() {
        return {
            id: [''],
            normalize_name: ['', Validators.required],
            name: ['', Validators.required],
            active: [true],
        };
    }

    private bindFormData(_data: Role) {
        this.title = this._translocoService.translate<string>(
            'user.dialog.title_add'
        );
        if (_data) {
            // update
            this._addMode = false;
            this.title = this._translocoService.translate<string>(
                'user.dialog.title_update'
            );
            this.form.get('id').patchValue(_data.id);
            this.form.get('normalize_name').patchValue(_data.normalize_name);
            this.form.get('name').patchValue(_data.name);
            this.form
                .get('active')
                .patchValue(_data.active == 1 ? true : false);
        }
    }
    onchange(
        event: boolean,
        page_id: number,
        sub_id: number,
        mode: string
    ): void {
        if (sub_id) {
            const permissionsSub = this.permissionsRole
                .find((obj) => obj.id === page_id)
                .childrens.find((sub) => sub.id === sub_id);

            const permissionsRoleEdit = permissionsSub.config_permissions.find(
                (obj) => obj.mode === mode
            );
            if (mode == 'VIEW') {
                permissionsSub.role = this.modifiedRole(
                    permissionsSub.role,
                    event
                );
            }

            permissionsRoleEdit.role = this.modifiedRole(
                permissionsRoleEdit.role,
                event
            );
        } else {
            const permissionspage = this.permissionsRole.find(
                (obj) => obj.id === page_id
            );

          
            if (mode == 'VIEW') {
              
                permissionspage.childrens[0].role = this.modifiedRole(
                    permissionspage.childrens[0].role,
                    event
                );
            }

            permissionspage.childrens.forEach((item) => {
                const permissionsRoleEdit = item.config_permissions.find(
                    (obj) => obj.mode === mode
                );
                permissionsRoleEdit.role = this.modifiedRole(
                    permissionsRoleEdit.role,
                    event
                );
            });
        }
    }
    filterRole(role1: string, name: string): boolean {
        if (role1 != '') {
            const isPresent = role1.split(',').includes(name.toUpperCase());
            return isPresent;
        }
        return false;
    }
    modifiedRole(role: string, event: boolean) {
        const normalize_name = String(this.form.get('normalize_name').value);
        const name = String(this.form.get('name').value);
        if (name.toLowerCase() === normalize_name.toLowerCase()) {
            if (role.includes(normalize_name)) {
                if (!event) {
                    if (role != '') {
                        let modified = role.split(',').filter(function (item) {
                            if (item != normalize_name) {
                                return item;
                            }
                        });

                        role = modified.join(',');
                    }
                }
            } else {
                if (role != '') {
                    let modified = role.split(',');
                    modified.push(normalize_name);
                    role = modified.join(',');
                } else {
                    role = normalize_name;
                }
            }
        } else {
            if (role.includes(normalize_name.toUpperCase())) {
                if (!event) {
                    if (role != '') {
                        let modified = role.split(',').filter(function (item) {
                            if (item != name.toUpperCase()) {
                                return item;
                            }
                        });

                        role = modified.join(',');
                    }
                }
            } else {
                if (role != '') {
                    let modified = role.split(',').filter(function (item) {
                        if (item != name.toUpperCase()) {
                            return item;
                        }
                    });
                    modified.push(normalize_name.toUpperCase());
                    role = modified.join(',');
                } else {
                    role = normalize_name.toUpperCase();
                }
            }
        }

        return role;
    }

    closeDialog(result = null) {
        this._dialogRef.close(result);
    }

    submit() {
        if (this._submitted) {
            return;
        }

        if (!this._addMode) {
            if (this.form.valid) {
                this._submitted = true;

                this.changeValue();

                this._userSubmit$.next(null);
            }
        } else {
            if (this.form.get('normalize_name').valid) {
                this._submitted = true;
                this._userSubmit$.next(null);
            }
        }
    }

    changeRole(role: string): string {
        role.replace(
            this.form.get('name').value.toUpperCase(),
            this.form.get('normalize_name').value.toUpperCase()
        );
        return role;
    }
    changeValue() {
        this.permissionsRole.forEach((item) => {
            if (item.childrens.length == 1) {
                item.childrens.forEach((child) => {
                    if (child.config_permissions.length !== 0) {
                        child.config_permissions.forEach((config) => {
                            config.role = this.changeRole(config.role);
                        });
                    }
                    child.role = this.changeRole(child.role);
                });
            } else {
                item.childrens.forEach((child) => {
                    child.role = this.changeRole(child.role);
                    child.config_permissions.forEach((config) => {
                        config.role = this.changeRole(config.role);
                    });
                });
            }
        });
    }
   
}
