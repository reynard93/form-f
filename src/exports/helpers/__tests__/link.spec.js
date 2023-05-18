import link from '../link'
import CONSTANT from '../../../constants/values/link'
import linkHelper from '../../../helpers/link-helper'
import en from '../../../../lang/en.json'

describe('#getBreadCrumb', () => {
  let payload = {}

  beforeEach(() => {
    payload = {
      isQuickMenu: null,
      isMom: null,
      isSp: null,
      urls: {
        MDS_REDIRECT_URL: 'MDS_REDIRECT_URL',
        QUICKLINKS_REDIRECT_URL: 'QUICKLINKS_REDIRECT_URL',
        INTERNAL_REDIRECT_URL: 'INTERNAL_REDIRECT_URL',
        ORGANISATION_PROFILE_REDIRECT_URL: 'ORGANISATION_PROFILE_REDIRECT_URL',
        PAYMENT_DETAILS_REDIRECT_URL: 'PAYMENT_DETAILS_REDIRECT_URL'
      },
      options: {}
    }
  })

  const _getLink = (text, href, target = '_self', action) => {
    return { text, href, target, action }
  }

  const qlBreadCrumb = [
    _getLink(en.links.my_mom_portal, 'MDS_REDIRECT_URL', '_self'),
    _getLink(en.links.quick_links, 'QUICKLINKS_REDIRECT_URL', '_self'),
    _getLink(en.links.go_to_organisation_profile, 'ORGANISATION_PROFILE_REDIRECT_URL', '_self'),
    _getLink(en.links.go_to_payment_details, 'PAYMENT_DETAILS_REDIRECT_URL', '_self')
  ]
  const ilpBreadCrumb = [
    _getLink(en.links.officer_dashboard, 'INTERNAL_REDIRECT_URL', '_self'),
    _getLink(en.links.go_to_organisation_profile, 'ORGANISATION_PROFILE_REDIRECT_URL', '_self'),
    _getLink(en.links.go_to_payment_details, 'PAYMENT_DETAILS_REDIRECT_URL', '_self')
  ]
  const currentBreadCrumb = [
    _getLink(en.links.my_mom_portal, 'MDS_REDIRECT_URL', '_self'),
    _getLink(en.links.work_passes, 'MDS_REDIRECT_URL', '_self')
  ]

  test.each`
    cases    | isMom    | getStateValue   | expected
    ${'QL'}  | ${true}  | ${CONSTANT.QL}  | ${qlBreadCrumb}
    ${'QL'}  | ${false} | ${CONSTANT.QL}  | ${qlBreadCrumb}
    ${'QL'}  | ${null}  | ${CONSTANT.QL}  | ${[]}
    ${'ILP'} | ${true}  | ${CONSTANT.ILP} | ${ilpBreadCrumb}
    ${'ILP'} | ${false} | ${CONSTANT.ILP} | ${ilpBreadCrumb}
    ${'ILP'} | ${null}  | ${CONSTANT.ILP} | ${[]}
    ${'NOW'} | ${true}  | ${''}           | ${currentBreadCrumb}
    ${'NOW'} | ${false} | ${''}           | ${currentBreadCrumb}
    ${'NOW'} | ${null}  | ${''}           | ${[]}
  `('when $cases, isMom = $isMom:', ({ isMom, getStateValue, expected }) => {
    linkHelper.getState = jest.fn().mockReturnValue(getStateValue)

    payload.isMom = isMom

    const result = link.getBreadCrumb(payload)

    expect(result).toEqual(expected)
  })

  it('isQuickmenu = true, return only momPortal', () => {
    payload.isQuickMenu = true

    const result = link.getBreadCrumb(payload)

    expect(result).toEqual([_getLink(en.links.my_mom_portal, 'MDS_REDIRECT_URL', '_self')])
  })

  it('isSp = true, return only quickmenu', () => {
    payload.isSp = true

    const result = link.getBreadCrumb(payload)

    expect(result).toEqual([_getLink(en.links.quick_links, 'QUICKLINKS_REDIRECT_URL', '_self')])
  })
})

describe('#getAcknowledgementLinks', () => {
  let payload = {
    isMom: null,
    urls: {
      MDS_REDIRECT_URL: 'MDS_REDIRECT_URL',
      QUICKLINKS_REDIRECT_URL: 'QUICKLINKS_REDIRECT_URL',
      INTERNAL_REDIRECT_URL: 'INTERNAL_REDIRECT_URL'
    },
    options: {}
  }

  beforeEach(() => {
    payload = {
      isMom: null,
      urls: {
        MDS_REDIRECT_URL: 'MDS_REDIRECT_URL',
        QUICKLINKS_REDIRECT_URL: 'QUICKLINKS_REDIRECT_URL',
        INTERNAL_REDIRECT_URL: 'INTERNAL_REDIRECT_URL'
      },
      options: {}
    }
  })

  const _getLink = (text, href, target = '_self', action) => {
    return { text, href, target, action }
  }

  const momWebsite = _getLink(en.links.mom_information_instruction, CONSTANT.MOM_WEBSITE_REDIRECT_URL, '_blank')
  const qlBreadCrumb = [
    _getLink(en.links.go_to_my_mom_portal, 'MDS_REDIRECT_URL'),
    _getLink(en.links.go_to_quick_links, 'QUICKLINKS_REDIRECT_URL'),
    momWebsite
  ]
  const ilpBreadCrumb = [_getLink(en.links.go_to_officer_dashboard, 'INTERNAL_REDIRECT_URL'), momWebsite]
  const currentBreadCrumb = [_getLink(en.links.go_to_my_mom_portal, 'MDS_REDIRECT_URL'), momWebsite]

  test.each`
    cases    | isMom    | getStateValue   | expected
    ${'QL'}  | ${true}  | ${CONSTANT.QL}  | ${qlBreadCrumb}
    ${'QL'}  | ${false} | ${CONSTANT.QL}  | ${qlBreadCrumb}
    ${'QL'}  | ${null}  | ${CONSTANT.QL}  | ${[]}
    ${'ILP'} | ${true}  | ${CONSTANT.ILP} | ${ilpBreadCrumb}
    ${'ILP'} | ${false} | ${CONSTANT.ILP} | ${ilpBreadCrumb}
    ${'ILP'} | ${null}  | ${CONSTANT.ILP} | ${[]}
    ${'NOW'} | ${true}  | ${''}           | ${currentBreadCrumb}
    ${'NOW'} | ${false} | ${''}           | ${currentBreadCrumb}
    ${'NOW'} | ${null}  | ${''}           | ${[]}
  `('when $cases, isMom = $isMom:', ({ isMom, getStateValue, expected }) => {
    linkHelper.getState = jest.fn().mockReturnValue(getStateValue)

    payload.isMom = isMom

    const result = link.getAcknowledgementLinks(payload)

    expect(result).toEqual(expected)
  })

  it('isSp = true, return only quickmenu', () => {
    payload.isSp = true

    const result = link.getAcknowledgementLinks(payload)

    expect(result).toEqual([_getLink(en.links.go_to_quick_links, 'QUICKLINKS_REDIRECT_URL'), momWebsite])
  })
})
