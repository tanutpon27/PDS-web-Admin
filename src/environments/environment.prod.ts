import versions from '_versions';

export const environment = {
    production: true,
    appUrl: 'https://localhost:4200',
    apiBaseUrl: 'https://brbparcelanddocumenttracking.azurewebsites.net/api',
    appVersion: versions.version + ' (' + versions.versionDate + ')',
    getEmpImageUrl: 'https://empmobile.boonrawd.co.th/HCMPRD/',
};
