import { mount, config } from '@vue/test-utils'
import FormHeader from '../FormHeader.vue'
import designSys from '@momwins/mom-design-system'

config.global.components = {
    'form-header': FormHeader
}

describe('FormFacilitator', () => {
    it('renders properly', () => { 
        const wrapper = mount(FormHeader, {
            props: {
                isQuickMenu: true,
                allowLogout: true,
                hasLogoutButton: true,
                allowSave: true,
                hasSaveButton: true,
                hideMyMomPortalForMomUser: true,
                title: 'HEADER_TITLE',
                subtitle: "HEADER_SUBTITLE_TEXT",
                lastSavedTime: "",
                breadcrumbUrls: {
                    MDS_REDIRECT_URL: 'MDS_REDIRECT_URL',
                    INTERNAL_REDIRECT_URL: 'INTERNAL_REDIRECT_URL',
                    QUICKLINKS_REDIRECT_URL: "String",
                    ORGANISATION_PROFILE_REDIRECT_URL: "String",
                    PAYMENT_DETAILS_REDIRECT_URL: "String"
                },
                userData: {
                    login: {
                        name: 'LOGIN_FULLNAME',
                        companyName: 'LOGIN_COMPANY_NAME',
                        uen: 'UEN',
                        division: "null",
                        branch: "null",
                        branchName: "null",
                        isEa: false,
                        isMom: false,
                        isSp: false
                    },
                    company: {
                        companyUen: ""
                    }
                }
            },
            global: {
                plugins: [designSys]
            }
        })

        expect(wrapper.exists()).toBeTruthy()
    })
})
