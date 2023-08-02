export interface GetLoginDisplayProps {
    company: {
        companyUen: String;
    };
    login: {
        isSp: Boolean;
        isEa: Boolean;
        isMom: Boolean;
        uen: String;
        division: String;
        branch: String;
        branchName: String;
        companyName: String;
        name: String;
    };
}
export interface GetLoginDisplayReturn {
    loginFullName: String;
    branchName: String;
    companyName: String;
    uenDivBranch: String;
}
declare const _default: {
    getLoginDisplay: (userData: GetLoginDisplayProps) => GetLoginDisplayReturn;
};
export default _default;
