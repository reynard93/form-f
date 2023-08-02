import CONSTANT from '../../constants/errors/uploader'

type ErrorType =
  | 'file_size_limit'
  | 'pdf_encrypted_error'
  | 'pdf_error'
  | 'invalid_file_error'
  | 'invalid_file_name_special_char'
  | 'invalid_file_name_length'

function getUploadError(type: ErrorType, maxTotalFileSize: string | number): string {
  const uploadErrors = {
    file_size_limit:
      +maxTotalFileSize === 2 ? CONSTANT.LIMIT_FILE_SIZE_ERROR : CONSTANT.LIMIT_FILE_SIZE_5MB_ERROR,
    pdf_encrypted_error: CONSTANT.PDF_ENCRYPTED_ERROR,
    pdf_error: CONSTANT.PDF_ERROR,
    invalid_file_error: CONSTANT.INVALID_FILE_ERROR,
    invalid_file_name_special_char: CONSTANT.INVALID_FILE_NAME_SPECIAL_CHAR_ERROR,
    invalid_file_name_length: CONSTANT.INVALID_FILE_NAME_LENGTH_ERROR
  }
  return uploadErrors[type]
}

export default getUploadError
