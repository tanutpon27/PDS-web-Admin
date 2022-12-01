import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { delay, Subject, takeUntil } from 'rxjs';


import { UserPagination } from 'app/models/Respond/user_list_Respond';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { times } from 'lodash';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from './user.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    isLoading: boolean = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    data: any;
    pagination: UserPagination;

    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name','mobile', 'active', 'company', 'user_status'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        public _AuthService: AuthService) {
      
    }

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
                this.pagination={
                    length: data.length,
                    size: 10,
                    page: 0,
                    lastPage: 0,
                    startIndex: 0,
                    endIndex: 0
                }
                this.recentTransactionsDataSource.data = this.data.slice(0, 10);
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if (  this._paginator )
        {   
            // Get products if sort or page changes 
           
        }
       
        
    }
    currentPage(event?:PageEvent){
        this.recentTransactionsDataSource.data = this.data.slice(event.pageSize*event.pageIndex, (event.pageSize*event.pageIndex)+event.pageSize);
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



}
