import createInputComponent, {
  FormGroupProps,
  type InputComponentProps
} from '../../utils/create-input-component'
import { defineComponent, h, PropType } from 'vue'

interface Params {
  docType: string
  link: boolean
  throwPdfError: boolean
}

interface DefaultUploadOptions {
  // default values for these don't pass in
  params: Params
  maxChunkRetries: number
  chunkRetryInterval: number
  withCredentials: boolean
}

type UploadOption = Partial<DefaultUploadOptions> & {
  url: string
  previewUrl: string
  previewPath: string
  headers: Record<string, string>
}

const options: DefaultUploadOptions = {
  params: {
    docType: '',
    link: false,
    throwPdfError: true
  },
  maxChunkRetries: 3,
  chunkRetryInterval: 30000,
  withCredentials: true
}

const getConfigOptions = (documentUrl = '/documents'): UploadOption => {
  // TODO: get from config
  // the remaining stuff from UploadOption
  return {
    // hardcode for testing?
    headers: { Authorization: '' },
    url: `${documentUrl}/upload`,
    previewUrl: `${documentUrl}/get-token`,
    previewPath: `${documentUrl}/$view/`
  }
}

const DocumentUploader = () => {
  return defineComponent({
    props: {
      fieldId: {
        type: String as PropType<FormGroupProps['fieldId']>,
        required: true
      },
      size: {
        type: String as PropType<FormGroupProps['size']>
      },
      index: Number as PropType<InputComponentProps['index']>,
      /** specifically customisable validateOn for each component **/
      validateOnLoad: {
        type: Boolean as PropType<InputComponentProps['validateOnLoad']>,
        default: false
      },
      validateOnSubmit: {
        type: Boolean as PropType<InputComponentProps['validateOnSubmit']>,
        default: false
      }
    },
    setup() {
      return () => {
        // i can't exactly define new props for the component
        return h(
          createInputComponent('mom-upload', {
            newProps: {
              maxFiles: 2,
              linkType: 'secureLink',
              options // cloneDeep within the component
            }
          })
        )
      }
    }
  })
}
