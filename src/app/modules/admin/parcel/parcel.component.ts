import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { debounceTime,map,switchMap,delay, Subject, takeUntil } from 'rxjs';


import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserPagination } from 'app/models/Respond/user_list_Respond';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { times } from 'lodash';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from './parcel.service';
import { AuthService } from 'app/core/auth/auth.service';

import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

var userService;
@Component({
    selector: 'user',
    templateUrl: './parcel.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcelComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    isLoading: boolean = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    data: any;
    pagination: UserPagination;
    listOptions: any;
    showForm: boolean;
    
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['Image','ref_code','users_name','users_phone','description','user_status','Active'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private apiUrl = `${environment.apiBaseUrl}/Parcel/v1/`;
    searchInputControl: UntypedFormControl = new UntypedFormControl();


    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        public _AuthService: AuthService,
        private http:HttpClient) {
            this.listOptions = { 1: 'parcel wait' , 2: 'parcel late' , 3: 'parcel confirm'/*,4:'parcel option',5:'parcel return'*/ }
            this.showForm = false;
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
                console.log(this.recentTransactionsDataSource.data);
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

    public saveFile(event,id): void {
        // ... save file
        try{
            console.log('event',event)
            // Get the dat
            const param = {
                "id": parseInt(id),
                "status": parseInt(event),
                "update_by": "-",
                "users_picture": "-",
                "description": "-",
                "type_id": "-",
                "date_time": "2022-11-27T12:36:42.581Z",
                "description_log": "-",
                "user_role": "ADMIN",
                "option_parcel": "-"
            };
            this.http.put(`${this.apiUrl}updateStatus`,param, {responseType: 'text'}).subscribe((data) => {
                this._userService.getData(this._AuthService.user)
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
                    console.log(this.recentTransactionsDataSource.data);
                    this.recentTransactionsDataSource.data = this.data.slice(0, 10);
                });
            });
        }
        catch(e){
            console.log('error',e);
        }
                
        
      }
    
      public handleDenial(): void {
          // ... don't save file and quit
      }
    
      public handleDismiss(dismissMethod: string): void {
        // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
        // ... do something
      }

      searchTxt:string = '';
      timeout = null;
      
      ShowForm(){
        if(this.showForm){
            this.showForm = false;
        }
        else{
            this.showForm = true;
        }
        console.log(this.showForm);
      }
      triggerSearch() {
          console.log('wait',this.searchTxt)
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            console.log('done',this.searchTxt)
            var result ;
            result = this.data.filter(o => o.users_name.includes(this.searchTxt));
            if(result.length !== 0){
                
                this.pagination={
                    length: result.length,
                    size: 10,
                    page: 0,
                    lastPage: 0,
                    startIndex: 0,
                    endIndex: 0
                }
                this.recentTransactionsDataSource.data = result.slice(0, 10);
                return;
            }
            
            result = this.data.filter(o => o.users_phone.includes(this.searchTxt));
            if(result.length !== 0){
                
                this.pagination={
                    length: result.length,
                    size: 10,
                    page: 0,
                    lastPage: 0,
                    startIndex: 0,
                    endIndex: 0
                }
                this.recentTransactionsDataSource.data = result.slice(0, 10);
                return;
            }

            result = this.data.filter(o => o.parcelDetail.ref_code.includes(this.searchTxt));
            if(result.length !== 0){
                
                this.pagination={
                    length: result.length,
                    size: 10,
                    page: 0,
                    lastPage: 0,
                    startIndex: 0,
                    endIndex: 0
                }
                this.recentTransactionsDataSource.data = result.slice(0, 10);
                return;
            }
            if(this.searchTxt == ''){
                
                this.pagination={
                    length:  this.data.length,
                    size: 10,
                    page: 0,
                    lastPage: 0,
                    startIndex: 0,
                    endIndex: 0
                }
                this.recentTransactionsDataSource.data = this.data.slice(0, 10);
            }
            else{
                
                this.pagination={
                    length: 0,
                    size: 10,
                    page: 0,
                    lastPage: 0,
                    startIndex: 0,
                    endIndex: 0
                }
                this.recentTransactionsDataSource.data = [];
            }
            
          }, 400);
        }
}
