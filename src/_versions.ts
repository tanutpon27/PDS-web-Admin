export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
};
export const versions: TsAppVersion = {
    version: '1.0.0',
    name: 'pds',
    versionDate: '2022-12-20T06:56:26.446Z',
    description: 'Material Tracking System',
    gitCommitHash: '06d0341',
    versionLong: '1.0.0-06d0341',
};
export default versions;
