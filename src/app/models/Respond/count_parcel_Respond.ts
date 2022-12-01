// To parse this data:
//
//   import { Convert, ModelCountParcel } from ./file;
//
//   const modelCountParcel = Convert.toModelCountParcel(json);

export interface CountParcelRespond {
    parcel_late?: number,
    parcel_wait?: number,
    parcel_confirm?: number,
    sum_parcel?: number,
    sum_document?: number,
    parcel_option?: number,
    parcel_return?: number,
    sum_parcel_doc?: number,
    total_parcel?: number,
    type_parcel_status?: number[],
    type_document_status?: number[],
    type_parcelDoc_status?: number[],
    status_wait?: number[],
    status_late?: number[],
    status_confirm?: number[],
    status_option?: number[],
    status_return?: number[]
}

export interface UserParcelRespond {
    user_admin?: number,
    user_count?: number,
    user_active?: number,
    user_non_active?: number
}
export interface Confirm {
    parcel:    number;
    documment: number;
}