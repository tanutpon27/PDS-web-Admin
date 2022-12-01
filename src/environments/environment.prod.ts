import versions from '_versions';

export const environment = {
    production: true,
    appUrl: 'https://localhost:4200',
    apiBaseUrl: 'https://parcel-management.azurewebsites.net/api/',
    fileUrl: 'https://parcel-management.azurewebsites.net/UploadedFiles',
    appVersion: versions.version + ' (' + versions.versionDate + ')',
    getEmpImageUrl: 'https://empmobile.boonrawd.co.th/HCMPRD/',
};
