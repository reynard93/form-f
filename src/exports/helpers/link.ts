import CONSTANT from '../../constants/values/link'
import en from '../../assets/lang/en.json'
import { get as objGet } from 'lodash'

const getState = (isMom: boolean) => {
  let state = ''

  if (isMom) {
    state = CONSTANT.ILP
  } else {
    state = CONSTANT.QL
  }

  return state
}

const _getTranslation = (keyword: string) => objGet(en, keyword)

const _getLink = (text: string, href: string, target = '_self', action: Function) => {
  return { text: _getTranslation(text), href, target, action }
}

export interface BreadCrumbUrls {
  MDS_REDIRECT_URL: string
  QUICKLINKS_REDIRECT_URL: string
  ORGANISATION_PROFILE_REDIRECT_URL: string
  PAYMENT_DETAILS_REDIRECT_URL: string
  INTERNAL_REDIRECT_URL: string
}

export interface GetBreadCrumbProps {
  isQuickMenu: boolean
  isMom: boolean
  isSp: boolean
  action: Function
  hideMyMomPortalForMomUser: boolean
  urls: BreadCrumbUrls
}

const getBreadCrumb = (props: GetBreadCrumbProps) => {
  const { isMom, isSp, urls, action, isQuickMenu, hideMyMomPortalForMomUser } = props

  const myMomPortal = _getLink(CONSTANT.MY_MOM_PORTAL, urls.MDS_REDIRECT_URL, '_self', action)
  const quickMenu = _getLink(CONSTANT.QUICK_LINKS, urls.QUICKLINKS_REDIRECT_URL, '_self', action)
  const organisationProfile = _getLink(
    CONSTANT.GO_TO_ORGANISATION_PROFILE,
    urls.ORGANISATION_PROFILE_REDIRECT_URL,
    '_self',
    action
  )
  const paymentDetails = _getLink(
    CONSTANT.GO_TO_PAYMENT_DETAILS,
    urls.PAYMENT_DETAILS_REDIRECT_URL,
    '_self',
    action
  )
  const officerDashboard = _getLink(
    CONSTANT.OFFICER_DASHBOARD,
    urls.INTERNAL_REDIRECT_URL,
    '_self',
    action
  )

  if (isQuickMenu) return isSp ? [] : [myMomPortal]

  if (isSp) return [quickMenu]

  if (isMom === null) return []

  const qlBreadCrumbs = [...(isMom && hideMyMomPortalForMomUser ? [] : [myMomPortal]), quickMenu]

  const ilpBreadCrumbs = [officerDashboard]

  if (urls.ORGANISATION_PROFILE_REDIRECT_URL) {
    qlBreadCrumbs.push(organisationProfile)
    ilpBreadCrumbs.push(organisationProfile)
  }

  if (urls.PAYMENT_DETAILS_REDIRECT_URL) {
    qlBreadCrumbs.push(paymentDetails)
    ilpBreadCrumbs.push(paymentDetails)
  }

  switch (getState(isMom)) {
    case CONSTANT.QL:
      return qlBreadCrumbs

    case CONSTANT.ILP:
      return ilpBreadCrumbs

    default:
      return [myMomPortal, _getLink(CONSTANT.WORK_PASSES, urls.MDS_REDIRECT_URL, '_self', action)]
  }
}

export default {
  getBreadCrumb,
  getState
}
