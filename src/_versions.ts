export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
}
export const versions: TsAppVersion = {
    version: '1.0.0',
    name: 'pds',
    versionDate: '2022-12-01T06:11:14.454Z',
    description: 'Parcel Management',
    gitCommitHash: '86a6de2',
    versionLong: '1.0.0-86a6de2',
};
export default versions;
