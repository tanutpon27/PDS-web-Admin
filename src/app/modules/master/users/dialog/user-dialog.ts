import {
    Component,
    ViewEncapsulation,
    Inject,
    OnInit,
    OnDestroy,
} from '@angular/core';
import {
    FormBuilder,
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
} from 'rxjs';

import { TranslocoService } from '@ngneat/transloco';

import { UserService } from '../user.service';
import { Role, UserList,Companyole } from '../user.types';
import { SettingsService } from 'app/core/settings/settings.sevice';

@Component({
    selector: 'user-dialog',
    templateUrl: './user-dialog.html',
})
export class UserDialog implements OnInit, OnDestroy {
    public title: string;

    public form: UntypedFormGroup;
    public photoUrl: string;
    private _submitted: boolean = false;
    private _addMode: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _userSubmit$ = new Subject();
    public roles: Observable<Role[]>;
    public companyole: Observable<Companyole[]>;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _dialogRef: MatDialogRef<UserDialog>,
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private _translocoService: TranslocoService,
        private _settingsService: SettingsService
    ) {
        
        this.companyole = this._settingsService.companyole$;
        this.roles = this._settingsService.role$;
        this.form = this._formBuilder.group(this.createFormGroup());
      
        this.bindFormData(_data);
    }

    ngOnInit(): void {
        this._userSubmit$
            .pipe(
                takeUntil(this._unsubscribeAll),
                catchError(() => of(false)),
                repeat(),
                exhaustMap(() => {
                    return this._addMode
                        ? this._userService.create({
                              company: this.form.get('company').value,
                              email: this.form.get('email').value,
                              mobile: this.form.get('mobile').value,
                              name: this.form.get('name').value,
                              username: this.form.get('username').value,
                              user_role_id:this.findRoles(this.form.get('user_role').value)
                          })
                        : this._userService.update({
                              id: this.form.get('id').value,
                              company: this.form.get('company').value,
                              email: this.form.get('email').value,
                              mobile: this.form.get('mobile').value,
                              name: this.form.get('name').value,
                              active: this.form.get('user_status').value
                                  ? 1
                                  : 0,
                              user_role_id:this.findRoles(this.form.get('user_role').value)
                               ,
                          });
                }),
                catchError(() => of(false)),
                repeat()
            )
            .subscribe((res) => {
             
                if (res !== false) {
                    this.closeDialog(true);
                }
                this._submitted = false;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
  
    private createFormGroup() {
        return {
            id: [''],
            name: ['', Validators.required],
            email: ['', Validators.required],
            company: ['', Validators.required],
            mobile: ['', Validators.required],
            username: [''],
            user_role: ['', Validators.required],
            user_status: [true],
        };
    }
    closeDialog(result = null) {
        this._dialogRef.close(result);
    }
    findRoles(role:string) {
       let role_id=0;
        this.roles
            .pipe(
                map((users) =>
                    users.find(
                        (user) =>
                            user.normalize_name ===
                            role
                    )
                ),
                find((user) => user !== undefined)
            )
            .subscribe((user) => role_id=user.id);
            return role_id;
    }
    submit() {
   
  
        if (this._submitted) {
            return;
        }

        if (this.form.valid) {
            this._submitted = true;
            this._userSubmit$.next(null);
        }
        
      
    }

    private bindFormData(_data: UserList) {
        this.title = this._translocoService.translate<string>(
            'user.dialog.title_add'
        );
        if (_data) {
            this._addMode = false;
            this.title = this._translocoService.translate<string>(
                'user.dialog.title_update'
            );

            this.form.get('id').patchValue(_data.id);
            this.form.get('name').patchValue(_data.name);
            this.form.get('email').patchValue(_data.email);
            this.form.get('company').patchValue(_data.company);
            this.form.get('mobile').patchValue(_data.mobile);
            this.form.get('user_role').patchValue(_data.user_role);
            this.form
                .get('user_status')
                .patchValue(_data.user_status == 1 ? true : false);
        }
    }
}
