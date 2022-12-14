// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import versions from '_versions';

export const environment = {
    production: false,
    appUrl: 'https://wonderful-bush-0b10d590f.2.azurestaticapps.net',
    apiBaseUrl: 'https://parcel-management.azurewebsites.net/api',
    fileUrl: 'https://parcel-management.azurewebsites.net/UploadedFiles',
    appVersion: versions.version + ' (' + versions.versionDate + ')-DEV',
    getEmpImageUrl: 'https://empmobile.boonrawd.co.th/HCMPRD/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
