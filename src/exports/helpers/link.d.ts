export interface BreadCrumbUrls {
    MDS_REDIRECT_URL: string;
    QUICKLINKS_REDIRECT_URL: string;
    ORGANISATION_PROFILE_REDIRECT_URL: string;
    PAYMENT_DETAILS_REDIRECT_URL: string;
    INTERNAL_REDIRECT_URL: string;
}
export interface GetBreadCrumbProps {
    isQuickMenu: Boolean;
    isMom: Boolean;
    isSp: Boolean;
    action: Function;
    hideMyMomPortalForMomUser: Boolean;
    urls: BreadCrumbUrls;
}
declare const _default: {
    getBreadCrumb: (props: GetBreadCrumbProps) => {
        text: any;
        href: string;
        target: string;
        action: Function;
    }[];
    getState: (isMom: Boolean) => String;
};
export default _default;
