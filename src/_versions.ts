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
    name: 'mts',
    versionDate: '2022-09-09T05:59:07.500Z',
    description: 'Material Tracking System',
};
export default versions;
