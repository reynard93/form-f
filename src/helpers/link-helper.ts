import CONSTANT from '../constants/values/link'

const getState = (isMom: Boolean): String => isMom ? CONSTANT.ILP : CONSTANT.QL

export default { getState }
