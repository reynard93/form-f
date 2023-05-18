import linkHelper from '../link-helper'
import CONSTANT from '../../constants/values/link'

describe('#getState', () => {
  test.each`
    isMom    | expected
    ${true}  | ${CONSTANT.ILP}
    ${false} | ${CONSTANT.QL}
  `('when isMom is $isMom ', ({ isMom, expected }) => {
    const result = linkHelper.getState(isMom)

    expect(result).toEqual(expected)
  })
})
