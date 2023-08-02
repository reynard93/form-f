import CONSTANT from '../../constants/values/link';
import linkHelper from '../../helpers/link-helper';
import en from "../../assets/lang/en.json";
import { get as objGet } from "lodash";
const _getTranslation = (keyword) => objGet(en, keyword);
const _getLink = (text, href, target = '_self', action) => {
    return { text: _getTranslation(text), href, target, action };
};
const getBreadCrumb = (props) => {
    const { isMom, isSp, urls, action, isQuickMenu, hideMyMomPortalForMomUser } = props;
    const myMomPortal = _getLink(CONSTANT.MY_MOM_PORTAL, urls.MDS_REDIRECT_URL, '_self', action);
    const quickMenu = _getLink(CONSTANT.QUICK_LINKS, urls.QUICKLINKS_REDIRECT_URL, '_self', action);
    const organisationProfile = _getLink(CONSTANT.GO_TO_ORGANISATION_PROFILE, urls.ORGANISATION_PROFILE_REDIRECT_URL, '_self', action);
    const paymentDetails = _getLink(CONSTANT.GO_TO_PAYMENT_DETAILS, urls.PAYMENT_DETAILS_REDIRECT_URL, '_self', action);
    const officerDashboard = _getLink(CONSTANT.OFFICER_DASHBOARD, urls.INTERNAL_REDIRECT_URL, '_self', action);
    if (isQuickMenu)
        return isSp ? [] : [myMomPortal];
    if (isSp)
        return [quickMenu];
    if (isMom === null)
        return [];
    const qlBreadCrumbs = [...(isMom && hideMyMomPortalForMomUser ? [] : [myMomPortal]), quickMenu];
    const ilpBreadCrumbs = [officerDashboard];
    if (urls.ORGANISATION_PROFILE_REDIRECT_URL) {
        qlBreadCrumbs.push(organisationProfile);
        ilpBreadCrumbs.push(organisationProfile);
    }
    if (urls.PAYMENT_DETAILS_REDIRECT_URL) {
        qlBreadCrumbs.push(paymentDetails);
        ilpBreadCrumbs.push(paymentDetails);
    }
    switch (linkHelper.getState(isMom)) {
        case CONSTANT.QL:
            return qlBreadCrumbs;
        case CONSTANT.ILP:
            return ilpBreadCrumbs;
        default:
            return [myMomPortal, _getLink(CONSTANT.WORK_PASSES, urls.MDS_REDIRECT_URL, '_self', action)];
    }
};
export default {
    getBreadCrumb,
    getState: linkHelper.getState
};