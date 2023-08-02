export interface GetLoginDisplayProps {
  company: {
    companyUen: string
  }
  login: {
    isSp: boolean
    isEa: boolean
    isMom: boolean
    uen: string
    division: string
    branch: string
    branchName: string
    companyName: string
    name: string
  }
}

export interface GetLoginDisplayReturn {
  loginFullName: string
  branchName: string
  companyName: string
  uenDivBranch: string
}

const getLoginDisplay = (userData: GetLoginDisplayProps): GetLoginDisplayReturn => {
  const getUenDivBranch = () => {
    const { companyUen } = userData.company
    const loginUserCompany = userData.login

    if (loginUserCompany.division && loginUserCompany.branch) {
      return `${loginUserCompany.uen}-${loginUserCompany.division}-${loginUserCompany.branch}`
    }

    const isEaTransacting = userData.login.isEa && loginUserCompany.uen !== companyUen

    if (isEaTransacting || userData.login.isMom) {
      return loginUserCompany.uen
    }

    return loginUserCompany.uen
  }

  return {
    loginFullName: getUenDivBranch(),
    branchName: userData.login.name,
    companyName: userData.login.branchName,
    uenDivBranch: userData.login.companyName
  }
}

export default {
  getLoginDisplay
}
