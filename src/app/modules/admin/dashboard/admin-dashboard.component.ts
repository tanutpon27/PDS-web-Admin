import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ParcelService ,UserService } from './admin-dashboard.service';
import { TranslocoService } from '@ngneat/transloco';
import { CountParcelRespond ,UserParcelRespond} from 'app/models/Respond/count_parcel_Respond';
import { AuthService } from 'app/core/auth/auth.service';
import { chartOptions } from './data';


@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

      
    chartOptions: any;
    data: any;
    DataParcel: CountParcelRespond = {};
    DataUser: UserParcelRespond = {};
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _parcelService: ParcelService,
        private _userService: UserService,
        private _router: Router,
        public _translocoService: TranslocoService,
        public _AuthService: AuthService
    ) {
        
        this.chartOptions=chartOptions;
    }



    ngOnInit(): void {
        this._parcelService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.DataParcel = data;
                // Prepare the chart data
                this._prepareChartData();
            });
        this._userService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                 this.DataUser = data;
                // Prepare the chart data
                //this._prepareChartData();
            });
    }


    ngOnDestroy(): void {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        this.chartOptions.series[0].data = this.DataParcel?.type_parcel_status ?? [];
        this.chartOptions.series[1].data = this.DataParcel?.type_parcelDoc_status ?? [];
        this.chartOptions.series[2].data = this.DataParcel?.type_document_status ?? [];
    }
}
