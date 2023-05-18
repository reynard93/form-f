import headerHelpers from '../header'

const LOGIN_UEN = 'LOGIN_UEN'
const COMPANY_UEN = 'COMPANY_UEN'
const DIV = 'DIV'
const BRANCH = 'BRANCH'
const FULLNAME = 'FULLNAME'
const BRANCH_NAME = 'BRANCH_NAME'
const COMPANY_NAME = 'COMPANY_NAME'

describe('#getLoginDisplay', () => {
  test.each`
    name        | expected
    ${FULLNAME} | ${FULLNAME}
    ${null}     | ${''}
  `('should return correct loginFullName', ({ expected, ...loginProps }) => {
    const result = headerHelpers.getLoginDisplay({
      company: {},
      login: loginProps
    })

    expect(result.loginFullName).toEqual(expected)
  })

  test.each`
    branchName     | expected
    ${BRANCH_NAME} | ${BRANCH_NAME}
    ${null}        | ${''}
  `('should return correct branchName', ({ expected, ...loginProps }) => {
    const result = headerHelpers.getLoginDisplay({
      company: {},
      login: loginProps
    })

    expect(result.branchName).toEqual(expected)
  })

  test.each`
    companyName     | expected
    ${COMPANY_NAME} | ${COMPANY_NAME}
    ${null}         | ${''}
  `('should return correct companyName', ({ expected, ...loginProps }) => {
    const result = headerHelpers.getLoginDisplay({
      company: {},
      login: loginProps
    })

    expect(result.companyName).toEqual(expected)
  })

  test.each`
    uen          | companyUen     | division | branch    | isEa     | isMom    | expected
    ${LOGIN_UEN} | ${LOGIN_UEN}   | ${null}  | ${null}   | ${false} | ${true}  | ${LOGIN_UEN}
    ${LOGIN_UEN} | ${COMPANY_UEN} | ${null}  | ${null}   | ${true}  | ${false} | ${LOGIN_UEN}
    ${LOGIN_UEN} | ${LOGIN_UEN}   | ${null}  | ${BRANCH} | ${false} | ${false} | ${`${LOGIN_UEN}`}
    ${LOGIN_UEN} | ${LOGIN_UEN}   | ${DIV}   | ${BRANCH} | ${false} | ${false} | ${`${LOGIN_UEN}-${DIV}-${BRANCH}`}
  `('should return correct uenDivBranch', ({ expected, companyUen, ...loginProps }) => {
    const result = headerHelpers.getLoginDisplay({
      company: { companyUen },
      login: loginProps
    })

    expect(result.uenDivBranch).toEqual(expected)
  })
})
